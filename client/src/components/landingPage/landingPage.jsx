import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css'

function LandingPage() {
    return (
        <div className='landingPage'>
            <Link className='link' to='/home'>
                <button className='btnEnter'>Catch</button>
            </Link>
        </div>
    );
}

export default LandingPage