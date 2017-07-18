import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import $ from 'jquery';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import fetchPLines from '../actions/fetchPLines';
import fetchProductLine from '../actions/fetchProductLine';


class NavBar extends Component{
	constructor(props) {
		super(props);
		this.state = {
			cart: []
		}
	}

	componentDidMount() {
		// const baseUrl = window.hostAddress + 'productlines/get';
		// $.getJSON(baseUrl, (results)=>{
		// 	this.setState({ressie:results});
		// });
		this.props.fetchPLines();
	}

	// componentWillUpdate(nextProps) {
	// 	var carty = [];
	// 	carty.push(nextProps.cart)
	// 	this.setState({
	// 		cart: nextProps.cart
	// 	})
	// }


	render(){

		var shopMenu = [];
		var logged = [
			<li className="text-right" key={1} ><Link to="/login">Login</Link></li>,
			<li className="text-right" key={2}><Link to="/register">Register</Link></li>
		];
		// this.state.ressie.map((pl,index)=>{
		// 	shopMenu.push(
		// 		<Link to={`/shop/${pl.link}`} key={index}>{pl.productLine}</Link>
		// 	)
		// 	return 'meh'
		// })
		if(this.props.productlines[0] === undefined){
			shopMenu = []
		}else{
			this.props.productlines.map((p, i)=>{
				shopMenu.push(
					<Link to={`/shop/${p.link}`} key={i} onClick={()=>{this.props.fetchProductLine(p.link)}} >{p.productLine}</Link>
				)
				return 'meh'
			})
		}

		if((this.props.register !== null)){
			// console.log(this.props.register.cart)
			logged.length = 0;
			logged.push(
				 <li className="text-right" key={1}><Link to='/account'>Welcome, {this.props.register.name} !</Link></li>,
				 <li className="text-right" key={2}><Link to="/logout">Log Out</Link></li>
			)
			// console.log(this.props.register.token)
			
		}
		var total = 0;
		var cartNum = 0;
		if(this.props.cart.total !== undefined){
			total = this.props.cart.total
			cartNum = this.props.cart.numItems
		}

	return(
		<div>
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container-fluid navbar-white">
					<ul className="nav navbar-nav">
						<li><Link to="/">Home</Link></li>
						<li className="dropdown">
							<Link to="/shop">Shop	<i className="arrow down" /></Link>
							<ul className="dropdown-links">
								{shopMenu}
							</ul>
						</li>
						<li><Link to="/about">About Us</Link></li>
						<li><Link to="/contact">Contact Us</Link></li>
					</ul>
					<form className='form-group float-right'>
						<input type='text' placeholder='sarchbar' className='barsarch' />
						<button className='btn btn-sarch'>sarch</button>
					</form>					
				</div>
				<div className="container-fluid navi">
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
						{logged}
						<li className="text-right"><Link to="/cart">({cartNum}) items in your cart | (${total})</Link></li>
					</ul>
				</div>
			</nav>
		</div>
		)
	}
}


function mapStateToProps(state){
	return{
		productlines: state.productLine,
		pl: state.pl,
		register: state.register,
		cart: state.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		fetchPLines: fetchPLines,
		fetchProductLine: fetchProductLine
	}, dispatch)	
}



export default connect(mapStateToProps,mapDispatchToProps)(NavBar)