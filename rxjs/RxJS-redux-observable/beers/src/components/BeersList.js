import React from "react";
import {connect} from "react-redux";


export function BeersList({beers}) {
    return (
        <ul className='List'>
            {beers.map(beer => {
                return (
                    <li key={beer.id} className={'List-item'}>
                        <figure className='List-item'>
                            <img src={beer.image_url}/>
                        </figure>
                        <div className='List-item-info'>
                            <p>{beer.name}</p>
                            <ul>
                                <li><small>ABV: {beer.abv}</small></li>
                                <li><small>Volume: {beer.volume.unit} {beer.volume.unit}</small></li>
                            </ul>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

