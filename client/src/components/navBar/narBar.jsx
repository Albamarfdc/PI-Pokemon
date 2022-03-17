import React, { useState} from 'react';
import { useDispatch,} from 'react-redux'
import { getNames } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Logo from '../assets/ash1.png'
import Homepoke from '../assets/Homeback1.png';
import './navBar.css'

function NavBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleName = (e) => {
        e.preventDefault();
        setName(e.target.value.toLowerCase());
        //console.log("HOLA",e.target.value)
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (name ) {
            dispatch(getNames(name))
            setName('')
        }
        //console.log("CHAO", name)
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
        <form onSubmit={(e) =>handleSubmit(e)}>
          <input
            className={'bar'}
            type="text"
            placeholder="    Find your Pokemon here..."
            value={name}
            onChange={(e) => handleName(e)}
          />
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