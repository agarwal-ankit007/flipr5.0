import React from 'react';

const Bottom = () => {
	return(
			<div style={{display:'flex',flexDirection: 'row',width: '100%',justifyContent: 'space-around'}} className="pa3">
				<div className="left" style={{width:'40%'}}>
					<div className="l" style={{borderBottom: '1px solid black'}}>
						<p>hello</p>
					</div>
					<div className="l" style={{borderBottom: '1px solid black'}}>
						<p>hello</p>
					</div>
					<div className="l" style={{borderBottom: '1px solid black'}}>
						<p>hello</p>
					</div>
				</div>
				<div className="right" style={{width:'40%'}}>
					<div className="r" style={{borderBottom: '1px solid black'}}>
						<p>hello</p>
					</div>
					<div className="r" style={{borderBottom: '1px solid black'}}>
						<p>hello</p>
					</div>
					<div className="r" style={{borderBottom: '1px solid black'}}>
						<p>hello</p>
					</div>
				</div>
			</div>
		);
}

export default Bottom;