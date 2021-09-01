import React from 'react'
import { Button } from '@material-ui/core';
import { buy, getSellCall, numSellCalls } from '../contractFunctions';
import { useState, useEffect } from "react"

// const SellCalls = ({ id }) => {
//   const { data, error } = useAsync({ promiseFn: fetchPerson, id })
//   if (error) return error.message
//   if (data) return `Hi, my name is ${data.name}!`
//   return null
// }
function SellCalls() {
    let items = []
    const [maxIdx, setMaxIdx] = useState(-1);
    const [sellCalls, setSellCall] = useState([]);

    useEffect(() => {
        if (maxIdx < 0) {
            (async () => {
                const idx = await numSellCalls();
                setMaxIdx(idx);
                for (let i = 0; i < idx; i++) {
                    const call = await getSellCall(i);
                    setSellCall(sellCalls => [...sellCalls, call]);
                }
            })()
        }
    }, []);

    // console.log(maxIdx)
    console.log(sellCalls)
    function iter(call, i) {
        const address = call[0]
        const price = parseInt(Number(call[1]._hex), 10)
        const amount = parseInt(Number(call[2]._hex), 10)
        const forPar = call[3]
        if(forPar){
            items.push(<div>Address: {address} price: {price} amount: {amount} Participants only<Button onClick={() => buy(i, document.getElementById("amount").value)}>Buy:{i}</Button></div>)
        } else {
            items.push(<div>Address: {address} price: {price} amount: {amount} Everybody<Button onClick={() => buy(i, document.getElementById("amount").value)}>Buy:{i}</Button></div>)
        }
    }
    sellCalls.forEach(iter)

    return items.map((val) => {
        return val
    });
}


export { SellCalls }