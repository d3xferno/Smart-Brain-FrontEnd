import React from 'react';
import './ImgLinkForm.css';
const ImgLinkForm = ({onInputChange,onButtonSubmit}) =>{
	return(
		<div>
			<p className='f3'>{'Hello World'}</p>
			<div className='center'>
				<div className=' form pa4 br3 shadow-5 center'>
					<input className='f4 pa2 w-70 center ' type='text' onChange = {onInputChange}/>
					<button className='pointer w-30 grow f4 link ph3 pv2 dib bg-light-yellow' onClick ={onButtonSubmit}>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImgLinkForm;