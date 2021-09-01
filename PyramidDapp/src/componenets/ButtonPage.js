import React from 'react'
import {Button} from '@material-ui/core';

const ButtonPage = ({pageName, setPage}) => {
    return (
        <Button onClick={() => {setPage(pageName)}}>{pageName}</Button>
    )
}

export default ButtonPage;