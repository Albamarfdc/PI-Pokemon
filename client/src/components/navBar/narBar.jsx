import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom';
import { getNames } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Logo from '../img/ash1.png'
import Homepoke from '../img/Homeback1.png';
import './navBar.css'

function NavBar() {
    const dispatch = useDispatch();
    const navegate = useNavigate();
    const [name, setName] = useState('');
    const pokemons = useSelector((state) => state.pokemons);

    const handleName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const search = pokemons.find((e) => e.name === name);

    const handleSubmit = (e) => {
        e.preventDefault();
        search ? dispatch(getNames(name)) : navegate.push('/home');
        setName('')
    };


    
    return (
        <div className={'navBar'}>
            <div className={'logo'}>
             <Link to='/'>
                    <img src={Logo} alt='ash' height='150px' width='200px'/>
                </Link> 
            </div>
            <div className={'searchDiv'}>
                {/* Search Poke */}
                <label className={'search'}></label>
                <form onSubmit={handleSubmit}>
                    <input className={'bar'} type='text' placeholder="    Find your Pokemon..."
                        value={name} onChange={handleName}/>
                </form>
            </div>
            <div className={'home'}>
                 <Link to='/home'>
                    <img src={Homepoke} alt='Home' width='100px'/>
                </Link> 
            </div>
        </div>
    );
}



export default NavBar;