// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "./PyrToken.sol";

/**
 * @title Pyramid
 */
contract Pyramid {

    MyToken public token;
    address public root;
    uint curr_key;
    mapping(address => Participant) public participants;
    mapping(uint => Invite) public key2Invite;
    SellCall[] public sellCalls;
    uint public numSellCalls;


    struct Participant {
        address self;
        address father;
        string name;
    }

    struct Invite {
        address creator;
        uint key;
        uint price; //price in wei
    }

    struct SellCall {
        address creator;
        uint price; //price in wei
        uint amount;
        bool onlyForPar;
    }
    
    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new MyToken(1000000000000);
        root = payable(msg.sender);
        participants[msg.sender] = Participant(msg.sender, root, "root");
        curr_key=1;

    }

    function keyExists(uint key) public view returns (bool) {
        bool flag = (key2Invite[key].creator != address(0));
        return flag;
    }

    function getPriceToJoin(uint key) public view returns (uint price){
        if (keyExists(key)) {
            price = key2Invite[key].price;
            return price;
        } else {
            return 0;
        }
    }

    function join(string memory name, uint inviteKey) public payable {
        Invite storage inv = key2Invite[inviteKey];
        address ancestor = inv.creator;

        require(msg.value >= inv.price, "msg.value must be greater than invitation price in wei");
        require(participants[msg.sender].self == address(0), "Sender can't already exist in pyramid");
        require(keyExists(inviteKey), "key does not exist");
        
        participants[msg.sender] = Participant(msg.sender, ancestor, name);
        uint amount2pay = msg.value;
        uint nextPayment;

        while(ancestor != root){
            (nextPayment, amount2pay) = math.div2(amount2pay);
            payable(ancestor).transfer(nextPayment);
            ancestor=participants[ancestor].father;
        }
        payable(ancestor).transfer(amount2pay);

    }

    function myAncestors()public view returns (string memory name)  {
       
        address ancestor= participants[msg.sender].father;
        return participants[ancestor].name;
    }

    function invite(uint price) public returns (bool){
        require(price >= 0, "Price needs to be bigger than 0");
        require(participants[msg.sender].self != address(0), "Sender is not in pyramid");
        key2Invite[curr_key] = Invite(msg.sender, curr_key, price);
        curr_key++;
        return true;
    }

    function buy(uint index, uint amount) payable public {
        SellCall storage call = sellCalls[index];
        uint price = call.price;
        address seller = call.creator;
        bool forPar = call.onlyForPar;
        if (forPar){
            require(participants[msg.sender].self != address(0), "Sender is not in pyramid");
        }
        require(price*amount == msg.value);
        require(amount <= token.balanceOf(seller));
        call.amount -= amount;
        token.transferFrom(seller, msg.sender, amount);
        
        address ancestor = seller;
        uint amount2pay = msg.value;
        uint nextPayment;

        while(ancestor != root){
            (nextPayment, amount2pay) = math.div2(amount2pay);
            payable(ancestor).transfer(nextPayment);
            ancestor=participants[ancestor].father;
        }
        payable(ancestor).transfer(amount2pay);
    }

    function sellCall(uint256 price, uint256 amount, bool forPar) public {
        uint256 balance = token.balanceOf(msg.sender);
        require(amount <= balance - token.allowance(msg.sender, address(this)));
        sellCalls.push(SellCall(msg.sender, price, amount, forPar));
        numSellCalls++;
    }

    function mint(uint amount) public{
        require(msg.sender == root);
        token.mint(amount);
        token.transfer(root, amount);
    }
}

library math {
    
    function div2(uint256 a) internal pure returns (uint256, uint256) {
        uint x = a/2;
        uint remainder = a - x*2;
        return (x+remainder, x);
    }
}
