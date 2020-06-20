import React, {useContext} from 'react'
import {ScrollView} from 'react-native'
import ResultsList from "../components/ResultsList";
import {Context} from "../context/context/Context";
import Loading from "../components/Loading";

export default () => {
    const {loading} = useContext(Context)
    return (
        <>
            {  loading ? <Loading/> :
                 < ScrollView>
                    < ResultsList/>
                 </ScrollView>
            }
        </>
          )
}
