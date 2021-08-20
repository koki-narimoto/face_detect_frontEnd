import React from 'react';
import Particles from "react-tsparticles";
import ParticlesConfig from './ParticlesConfig';
import Particles2Config from './Particles2Config';


export default function ParticleBackground(){
    return(
        <div className='body particles'>
            <Particles params={ParticlesConfig}></Particles>
        </div>
    );
}
