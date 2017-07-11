import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import Slick from './Slick'

class NavBar extends Component{
  render(){
    return(
    	<div>
			<nav className="navbar navbar-default navbar-fixed-top">
			  <div className="container-fluid navbar-white">
			    <ul className="nav navbar-nav">
			    	<li><Link to="/">Home</Link></li>
			      	<li className="dropdown">
			      		<Link to="/shop">Shop <i className="arrow down" /></Link>
			      		<ul className="dropdown-links">
			      			<Link to="/shop/cars">Cars</Link>
			      			<Link to="/shop/motorcycles">Motorcycles</Link>
			      			<Link to="/shop/planes">Planes</Link>
			      			<Link to="/shop/ships">Ships</Link>
			      			<Link to="/shop/trains">Trains</Link>
			      			<Link to="/shop/trucks-buses">Trucks/Buses</Link>
			      		</ul>
			      	</li>
			      	<li><Link to="/about">About Us</Link></li>
			      	<li><Link to="/contact">Contact Us</Link></li>
			    </ul>
			  </div>
			  <div className="container">
			    <div className="navbar-header">
			    	<Link to="/" className="navbar-brand">
			    		<div className='logo'>
							<div className='circleOne'>
								<div className='circleTwo'>
									<span>S</span>
								</div>					
							</div>
						</div>
						<div className='name'>ARCH</div></Link>
			    </div>
				   <ul className="nav navbar-nav float-right">
				      <li className="text-right"><Link to="/login">Login</Link></li>
				      <li className="text-right"><Link to="/register">Register</Link></li>
				      <li className="text-right"><Link to="/cart">(0) items in your cart | ($0.00)</Link></li>
				   </ul>
			  </div>
			</nav>
	        <Route exact path="/" component={Slick} />
        </div>
	)
  }
}

export default NavBar