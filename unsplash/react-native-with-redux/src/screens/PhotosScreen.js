import React from 'react'
import {ScrollView} from 'react-native'
import ResultsList from "../components/ResultsList";
import Loading from "../components/Loading";
import {connect} from 'react-redux'


const PhotosScreen = ({state}) => {

    return (
        <>
        {  state.loading ? <Loading/> :
                < ScrollView>
                    < ResultsList/>
                </ScrollView>
        }
</>
          )
}

function mapStateToProps(state) {

    return {
        state: state.app
    }
}

export default connect(mapStateToProps)(PhotosScreen)
