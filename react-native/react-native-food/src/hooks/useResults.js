import {useEffect, useState} from 'react'
import yelp from "../api/yelp";


export default () => {
    const [results, setResults] = useState([])
    const [errorMessage, setErrorMesage] = useState('')

    const searchApi = async (searchTerm) => {
        try {
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: 'san jose'
                }
            })
            setResults(response.data.businesses)
        } catch (e) {
            setErrorMesage('Something went wrong')
        }
    }

    useEffect(() => {
        searchApi('ch')
    }, [])

    return [searchApi, results, errorMessage]
}
