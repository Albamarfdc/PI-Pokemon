import React from "react";
import { Link } from 'react-router-dom';


function PokeCard({ name, types, img, id }) {
    return (
        <div>
            <div>
                <img src={img} alt='pokemon' width="40%" height="40%" />
            </div>
            <Link to={'/home' + id}>
                <h3>{name[0].toUpperCase() + name.slice(1)}</h3>
                {types?.map((e) => (
                    <span  key={e}>
                    {' '}
                    {e[0].toUpperCase() + e.slice(1)}
                    </span>
                ))}
            </Link>
        </div>
    )
}

export default PokeCard;