import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import $ from 'jquery';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import fetchPLines from '../actions/fetchPLines';


class NavBar extends Component{
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		ressie: []
	// 	}
	// }

	componentDidMount() {
		// const baseUrl = window.hostAddress + 'productlines/get';
		// $.getJSON(baseUrl, (results)=>{
		// 	this.setState({ressie:results});
		// });
		this.props.fetchPLines();
	}



  render(){
  	var shopMenu = [];
  	// this.state.ressie.map((pl,index)=>{
  	// 	shopMenu.push(
  	// 		<Link to={`/shop/${pl.link}`} key={index}>{pl.productLine}</Link>
  	// 	)
  	// 	return 'meh'
  	// })
  	if(this.props.pl[0] === undefined){
  		shopMenu = []
  	}else{
  		this.props.pl.map((p, i)=>{
  			shopMenu.push(
				<Link to={`/shop/${p.link}`} key={i}>{p.productLine}</Link>
			)
			return 'meh'
  		})
  	}

    return(
    	<div>
			<nav className="navbar navbar-default navbar-fixed-top">
			  <div className="container-fluid navbar-white">
			    <ul className="nav navbar-nav">
			    	<li><Link to="/">Home</Link></li>
			      	<li className="dropdown">
			      		<Link to="/shop">Shop  <i className="arrow down" /></Link>
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
				      <li className="text-right"><Link to="/login">Login</Link></li>
				      <li className="text-right"><Link to="/register">Register</Link></li>
				      <li className="text-right"><Link to="/cart">(0) items in your cart | ($0.00)</Link></li>
				   </ul>
			  </div>
			</nav>
        </div>
	)
  }
}


function mapStateToProps(state){
	return{
		pl: state.productLine
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		fetchPLines: fetchPLines
	}, dispatch)
}



export default connect(mapStateToProps,mapDispatchToProps)(NavBar)