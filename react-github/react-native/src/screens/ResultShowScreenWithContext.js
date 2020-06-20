import React from 'react'
import {GithubState} from "../context/context/GithubState";
import ResultsShowScreen from "./ResultsShowScreen";

export default ({navigation}) => {
    return <GithubState>
        <ResultsShowScreen navigation={navigation}/>
    </GithubState>
}
