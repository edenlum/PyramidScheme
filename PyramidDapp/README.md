Pyramid.sol:
three structs:

Participant-a node in the pyramid with self, father, name fields
Invite- invitation to join the pyramid with creator, key, price fields 
SellCall- participant in pyramid can sell his tokens with creator, price, amount, onlyForPar fields. 

constructor:
the root of the pyramid

Mappings:
address to participant and key to invitation 

array:
array of all sell offers

functions:
keyExists- when joining the pyramid it is required to deliver a key of existing invitation, this function checks if key is valid.

getPriceToJoin- get price of invitation by key.

join- join the pyramid, creates, and adds participant to mapping, 
required: address of participant is not in pyramid, participant has enough
value to join (bigger than price of invitation) and key exists.
transfers half of price to father and the rest to ancestors.

invite- adds invitation to mapping, with current key and increases current key by 1.

buy-given a sellCall and amount of Token transfers token to buyer and transfers the price to seller and his ancestors.

sellCall- adds token sell offer, creates sellCall and adds it to sellCall array. Can choose if offer is for everybody or only for participants (cheaper for participants).

mint- mint function.

div2- division function, returns (number/2+reminder, number/2).


How to start the pyramid:

Enter pyramidDapp, 

Terminal: npm install

npx hardhat run .\scripts\deploy.js --network kovan

npm start
