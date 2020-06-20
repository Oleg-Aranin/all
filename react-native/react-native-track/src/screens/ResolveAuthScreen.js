import React, {useEffect, useContext} from 'react'
import {Context} from "../context/AuthContext";

export default () => {
    const {tryLocalSignin} = useContext(Context)

    useEffect(() => {
        tryLocalSignin()
    }, [])

    return null
}

