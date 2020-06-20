import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer 92bTPEai6xfGTOiS3LIBmrP5DmZjHvw4KNOgaOEKSh9qvty6t01adC0Ou3s-rxzlM2bPaAWr8nThYiJsETpEEP0xpA103q23EOf2vft_1-H0yBGQwAI2c242T8W9XXYx'
    }
})
