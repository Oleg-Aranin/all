import React, {useContext} from 'react'
import { StyleSheet, ScrollView, Text} from 'react-native'
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import {GithubContext} from "../context/context/githubContext";
import Loading from "../components/Loading";

export default () => {
    const {loading} = useContext(GithubContext)
    return (
        <>
                <SearchBar/>

            {loading ? <Loading/> :
                < ScrollView>
                    < ResultsList/>
                </ScrollView>
            }

    </>
                )
}

const styles = StyleSheet.create({})
