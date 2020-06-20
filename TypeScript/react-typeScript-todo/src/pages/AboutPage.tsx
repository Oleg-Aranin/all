import React from "react";
import {useHistory} from 'react-router-dom'

export const AboutPage: React.FC = () => {
    const history = useHistory()
    return (
        <>
            <h1>Страница информации</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur delectus eaque id ipsum minima modi
                pariatur, quisquam repellendus temporibus veritatis.
            </p>

            <button
                onClick={() => history.push('/')}
                className='btn'>К списку дел
            </button>
        </>
    )
}
