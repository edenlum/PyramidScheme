import { ethers } from 'ethers'
import Pyramid from './artifacts/contracts/Pyramid.sol/Pyramid.json'
import PyrToken from './artifacts/contracts/PyrToken.sol/MyToken.json'

// const contractAddress = "0x92441526c82b4aA8b16D420fCff77861FFD7Db2b"
const contractAddress = "0x6FD4D7fA7a157cf229D21A7B348eAFB2c3a6a146"


// request access to the user's MetaMask account
async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

async function displayParticipant(address) {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, Pyramid.abi, provider)
    try {
      const participant = await contract.participants(address)
      console.log('participant: ', participant)
    } catch (err) {
      console.log("Error: ", err)
    }
  }
}

async function getInvite(key) {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, Pyramid.abi, provider)
    let invite = 1;
    try {
      invite = await contract.key2Invite(key)
      console.log('invite: ', invite)
    } catch (err) {
      console.log("Error: ", err)
    }
    return invite
  }
}

async function root(){
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, Pyramid.abi, provider)
    try {
      const address = await contract.root()
      console.log('address: ', address)
      alert("root address is "+address);
    } catch (err) {
      console.log("Error: ", err)
    }
  }
}

async function token(){
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, Pyramid.abi, provider)
    try {
      const address = await contract.token()
      console.log('token address: ', address)
      return address;
    } catch (err) {
      console.log("Error: ", err)
    }
  }
}

async function numSellCalls(){
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, Pyramid.abi, provider)
    let num = 0
    try {
      let num_hex = await contract.numSellCalls()
      num = parseInt(Number(num_hex._hex), 10)
      console.log('# of sell calls: ', num)
    } catch (err) {
      console.log("Error: ", err)
    }
    return num;
  }
}

async function join(name, inviteKey) {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Pyramid.abi, signer)

    try {
      const invitation = await getInvite(inviteKey)
      const price = ethers.utils.parseUnits(String(Number(invitation[2]._hex)), 0)
      let overrides = {value: price}
      const transaction = await contract.join(name, inviteKey, overrides)
      await transaction.wait()
    } catch (err) {
      console.log("Error: ", err)
    }
  }
}

async function invite(price) {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Pyramid.abi, signer)

    try {
      const transaction = await contract.invite(price)
      await transaction.wait()
    } catch (err) {
      console.log("Error: ", err)
    }
  }
}

async function mint(amount) {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Pyramid.abi, signer)

    try {
      console.log(amount)
      const transaction = await contract.mint(amount)
      await transaction.wait()
    } catch (err) {
      console.log("Error: ", err)
    }
  }
}

async function getSellCall(index) {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Pyramid.abi, signer)
    let sellCall = []
    try {
      sellCall = await contract.sellCalls(index)
      console.log("sellCall: ", sellCall)
    } catch (err) {
      console.log("Error: ", err)
    }
    return sellCall
  }
}

async function buy(index, amount) {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Pyramid.abi, signer)

    try {
      let sellCall = await getSellCall(index)
      let total = ethers.utils.parseUnits(String(amount*Number(sellCall[1]._hex)), 0)
      let overrides = {value: total}
      const transaction = await contract.buy(index, amount, overrides)
      await transaction.wait()
    } catch (err) {
      console.log("Error: ", err)
    }
  }
}

async function sell(price, amount, forPar) {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Pyramid.abi, signer);

    let tokenAddress = token();
    const tokenContract = new ethers.Contract(tokenAddress, PyrToken.abi, signer)

    try {
      let overrides = {value: ethers.utils.parseEther(amount)};
      const allow = await tokenContract.approve(contractAddress, amount)
      await allow.wait()
      const transaction = await contract.sellCall(price, amount, forPar)
      await transaction.wait()
    } catch (err) {
      console.log("Error: ", err)
    }
  }
}

export {invite, root, join, buy, displayParticipant, getInvite, token, sell, mint, getSellCall, numSellCalls};
