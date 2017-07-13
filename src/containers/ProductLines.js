import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import $ from 'jquery';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchProducts from '../actions/fetchProducts';
import fetchProductLine from '../actions/fetchProductLine';
		
class ProductLines extends Component{



	componentDidMount() {
		// console.log(this.props.pl)
		var prod = this.props.match.params.pl
		this.props.fetchProducts(prod);
		// this.props.fetchProductLine(prod)
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	// console.log(this.props.pl)
	// 	// console.log(nextState)
	// 	if(this.props.pl !== nextProps.pl){
	// 		return true;
	// 	}else{
	// 		return false;
	// 	}
	// }

	componentWillUpdate(nextProps) {
		// console.log(nextProps)
		var prod = this.props.match.params.pl;
		this.props.fetchProducts(prod);
		// this.props.fetchProductLine(prod)
	}



	render(){
		var mapped = [];
		this.props.products.map((p, i)=>{
			mapped.push(
				<li key={i}>
					<Link to={`/product/${p.productName}`} >{p.productName}</Link>
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
			products: state.products,
			pl: state.pl
		}
	}

	function mapDispatchToProps(dispatch){
		return bindActionCreators({
			fetchProducts: fetchProducts,
			fetchProductLine: fetchProductLine
		}, dispatch)
	}






export default connect(mapStateToProps,mapDispatchToProps)(ProductLines);