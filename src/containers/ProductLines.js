import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchProducts from '../actions/fetchProducts';
import fetchProductLine from '../actions/fetchProductLine';
		
class ProductLines extends Component{
	constructor(props) {
		super(props);
		this.sortTable = this.sortTable.bind(this);
		this.state = {
			prod: [],
			toggle: false,
			lastCol: ''
		}
	}

	sortTable(colName){
		var tog = this.state.toggle;
		var proL = this.state.prod;
		var curCol = colName;

		if (this.state.lastCol !== curCol){
			tog = !tog;
		}


		proL.sort((a,b)=>{
				var textA = a[colName];
				var textB = b[colName];
			if(tog === true){
				return (textA < textB) ? -1: (textA > textB) ? 1:0;
			}else{
				return (textA < textB) ? 1: (textA > textB) ? -1:0;
			}
		})

		this.setState({
			prod: proL,
			toggle: !tog,
			lastCol: colName
		})

	}


	componentDidMount() {
		// console.log(this.props.pl)
		var prod = this.props.match.params.pl
		const baseUrl = `${window.hostAddress}products/get/${prod}`;
		const thePromise = $.getJSON(baseUrl,(results)=>{
			this.setState({
				prod: results
			})			
		});		
		// this.props.fetchProducts(prod);

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

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps)
		var prod = nextProps.match.params.pl;
		// nextProps.fetchProducts(prod);
		// var prod = this.props.match.params.pl
		const baseUrl = `${window.hostAddress}products/get/${prod}`;
		const thePromise = $.getJSON(baseUrl,(results)=>{
			this.setState({
				prod: results
			})			
		});	
		// this.props.fetchProductLine(prod)
	}



	render(){




		var title = '';
		if (this.state.prod[0] === undefined){
			title = '';
		}else{
			title = this.state.prod[0].productLine;
		}
		var mapped = [];
		var inStock = '';
		var stockClass = '';
		this.state.prod.map((p, i)=>{
			if(p.quantityInStock > 100){
				inStock = 'In Stock!';
				stockClass = 'text-success';
			}else if(p.quantityInStock > 0){
				inStock = 'Order Soon!';
				stockClass = 'bg-warning';
			}else{
				inStock = 'Out of Stock!';
				stockClass='bg-danger';
			}
			mapped.push(
				<tr key={i}>
					<td><Link to={`/product/${p.productName}`} >{p.productName}</Link></td>
					<td>{p.productScale}</td>
					<td>{p.productVendor}</td>
					<td>{p.productDescription}</td>
					<td className={stockClass}>{inStock}</td>
					<td>${p.buyPrice}</td>
					<td>${p.MSRP}</td>
				</tr>
			)
			return 'meh'
		})
		return(
			<div>
				<h1>{title}</h1>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th className='table-head names' onClick={()=>{this.sortTable('productName')}}>Product Name</th>
							<th className='table-head scale' onClick={()=>{this.sortTable('productScale')}}>Model Scale</th>
							<th className='table-head vendor' onClick={()=>{this.sortTable('productVendor')}}>Made By</th>
							<th className='table-head desc' onClick={()=>{this.sortTable('productDescription')}}>Description</th>
							<th className='table-head stock' onClick={()=>{this.sortTable('quantityInStock')}}>Quantity</th>
							<th className='table-head price' onClick={()=>{this.sortTable('buyPrice')}}>Your Price</th>
							<th className='table-head msrp' onClick={()=>{this.sortTable('MSRP')}}>MSRP</th>
						</tr>
					</thead>
					<tbody>
						{mapped}
					</tbody>
				</table>
			</div>
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