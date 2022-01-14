import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';	
const Logo = () =>{
	return(
		<div className='ma3 mt0 '>
			<Tilt className="Tilt shadow-2" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
 			<div className="Tilt-inner pa2"><img alt='logo' style = {{paddingTop:'2px'}} src={brain}/></div>
			</Tilt>			
		</div>
	);
}

export default Logo;