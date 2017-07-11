import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
	render(){
		return(
			<div id='NavBar'>
				<div className='logo'>
					<div className='circleOne'>
						<div className='circleTwo'>
							<span>S</span>
						</div>
					</div>
				</div>
				<div className='name'>ARCH</div>				
				<div className='home'>
					<Link to='/'>home</Link>
				</div>
				<div className='shop'>shop</div>
				<div className='cart'>cart</div>				
				<div className='login'>
					<button className='btn btn-log'>login</button>
					<button className='btn btn-reg'>register</button>
				</div>
				<form className='sarchbar'>
					<input type='text' placeholder='sarchbar' className='barsarch' />
					<button className='btn btn-sarch'>sarch</button>
				</form>
			</div>
		)
	}
}



export default NavBar;