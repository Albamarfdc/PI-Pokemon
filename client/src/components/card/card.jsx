import React from "react";
import { Link } from 'react-router-dom';
import './card.css'


function PokeCard({ name, types, img, id }) {
    return (
        <div>
            <Link className={'cardDet'} to={'/detail/'+ id}>
                <img src={img} alt='pokemon' width="70%" height="70%" />
                <h3 className={"name"}>{name}</h3>
            <div>
                </div>
                {types?.map((e) => (
                    <span key={e}>
                    {' '}
                    {e[0].toUpperCase() + e.slice(1) }
                    </span>
                ))}
            </Link>
        </div>
    )
}

export default PokeCard;