import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import logo from './logo.png'

const Logo = () => {
    return (
        <div className = 'ma4 mt0'>
            <Tilt className = 'br2 shadow-2' style ={{height: '150px', width: '150px'}}>
                <img alt = 'logo' src={logo}/>
                
            </Tilt>
        </div>
    );
}

export default Logo;
