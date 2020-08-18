import React from 'react';
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';
import './Data.css';


const Data = () => {
	return (

		<div className="br2 shadow-2">
			<Top />
			<hr/>
			<Middle />
			<hr/>
			<Bottom />
		</div>

		);
}

export default Data;