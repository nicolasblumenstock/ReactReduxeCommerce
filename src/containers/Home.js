import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchPLines from '../actions/fetchPLines';
import {Link} from 'react-router-dom';
// import '../../public/css/styles.css';

class Home extends Component {
	constructor(props) {
		super(props);
		
	}

	componentDidMount() {
		this.props.fetchPLines();
	}




	render(){
		const plImages = [];
		this.props.productLine.map((row,index)=>{
			console.log(row.image)
			plImages.push(
				<div className='shop-img' key={index}>
					<Link to={`/shop/${row.link}`}>
						<img src={row.image} alt={row.textDescription} />
					</Link>
					<div className='text'>{row.productLine}</div>
				</div>
			)
			return 'meh'
		})
		return(
			<div className='text-center'>
				<h1>HOME</h1>
				{plImages}
			</div>

		)
	}
}

function mapStateToProps(state){
	return{

		productLine: state.productLine

	}
}

function mapDispatchToProps(dispatch){
	return{
		fetchPLines: fetchPLines
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);