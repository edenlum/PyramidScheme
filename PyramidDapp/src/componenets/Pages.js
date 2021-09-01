import React from 'react'
import {Button } from '@material-ui/core';
import {invite, root, join, displayParticipant, getInvite, token, sell, mint, numSellCalls} from '../contractFunctions';
import {SellCalls} from "./SellCall"

const JoinPage = () => {
    return (
        <div>
            <input id="name" placeholder="name"/>
            <input id="inviteKey" placeholder="invite key"/>
            <Button onClick={() => join(document.getElementById("name").value, document.getElementById("inviteKey").value)}>Submit</Button>
        </div>
    )
}

const InvitePage = () => {
    return (
        <div>
            <input id="price" placeholder="price"/>
            <Button onClick={() => invite(document.getElementById("price").value)}>Submit</Button>
            
        </div>
    )
}

const BuyPage = () => {
    return (
        <div>
            <input id="amount" placeholder="amount"/>
            <SellCalls/>
        </div>
    )
}

const DebugPage = () => {
    return (
        <div>
            <input id="address" placeholder="address"/>
            <Button onClick={() => displayParticipant(document.getElementById("address").value)}>Get Participant</Button>
            <br/>
            <input id="key" placeholder="key"/>
            <Button onClick={() => getInvite(document.getElementById("key").value)}>Get Invite</Button>
            <br/>
            <Button onClick={root}>root</Button>
            <br/>
            <Button onClick={token}>Token</Button>
            <br/>
            <input id="mint amount" placeholder="mint amount"/>
            <Button onClick={() => mint(document.getElementById("mint amount").value)}>Mint</Button>
            <br/>
            <Button onClick={numSellCalls}># sell calls</Button>
        </div>
    )
}

const SellPage = () => {
    return (
        <div>
            <input id="price" placeholder="price"/><br/>
            <input id="amount" placeholder="amount"/><br/>
            <Button onClick={() => sell(document.getElementById("price").value, document.getElementById("amount").value, false)}>Sell for all</Button>
            <br/>
            <Button onClick={() => sell(document.getElementById("price").value, document.getElementById("amount").value, true)}>Sell for participants</Button>
        </div>
    )
}

export {JoinPage, InvitePage, BuyPage, DebugPage, SellPage};