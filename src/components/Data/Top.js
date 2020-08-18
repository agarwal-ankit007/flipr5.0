import React from 'react';

const Top = () => {
	return(
		<div style={{display: 'flex',justufyContent: 'flex-start', flexDirection: 'column',alignItems: 'flex-start'}} className="pa3 ma3">
		<select>
			<option>NSE</option>
			<option>BSE</option>
		</select>
		<h1>Nifty</h1>
		</div>
		);
}

export default Top;