import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import $ from 'jquery';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchProducts from '../actions/fetchProducts';

class ProductLines extends Component{


	componentDidMount() {
		var pl = this.props.match.params.pl;
		this.props.fetchProducts(pl);
	}

	componentWillReceiveProps() {
		var pl = this.props.match.params.pl;
		this.props.fetchProducts(pl);
	}



	render(){
		var mapped = [];
		this.props.products.map((p, i)=>{
			mapped.push(
				<li>
					<Link to={`/product/${p.productName}`} key={i}>{p.productName}</Link>
				</li>
			)
			return 'meh'
		})
		return(
			<ul>
				{mapped}
			</ul>
		)
	}

}

	function mapStateToProps(state){
		return{
			products: state.products
		}
	}

	function mapDispatchToProps(dispatch){
		return bindActionCreators({
			fetchProducts: fetchProducts
		}, dispatch)
	}






export default connect(mapStateToProps,mapDispatchToProps)(ProductLines);