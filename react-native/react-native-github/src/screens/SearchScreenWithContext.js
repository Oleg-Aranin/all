import React from 'react'
import {GithubState} from "../context/context/GithubState";
import SearchScreen from "./SearchScreen";

export default () => {
    return <GithubState>
        <SearchScreen/>
    </GithubState>
}
