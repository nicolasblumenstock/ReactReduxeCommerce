import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import Checkout from '../actions/Checkout';
import {Link} from 'react-router-dom';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.makePayment = this.makePayment.bind(this);
	}

	componentDidMount() {
		// console.log(this.props.logged)
		if(this.props.logged !== null){
			// console.log(this.props.logged.token)
			this.props.checkout(this.props.logged.token)
		}
	}
	    makePayment() {
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_BdXTGWFPZxnNwmYvcaFc39DK',
            image: 'https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
            locale: 'auto',
            token: (token) => {
            	console.log(token)
                var theData = {
                    amount: this.props.cart.total * 100,
                    stripeToken: token.id,
                    userToken: this.props.logged.token,
                }
                $.ajax({
                    method: 'POST',
                    url: `${window.hostAddress}stripe`,
                    data: theData
                }).done((data) => {
                    console.log(data);
                    if (data.msg === 'paymentSuccess') {
                    	this.props.history.push('/thankYou');
                    }
                });
            }
        });
        handler.open({
            name: "Pay Now",
            description: 'Pay Now',
            amount: this.props.cart.total * 100
        })
    }

	render(){
		// console.log(checkoutItems)
		var cartItems = []
		var total = 0;
		// var count = 1;
		if(this.props.checkoutItems !== null){
			this.props.checkoutItems.map((item, index)=>{
				total += item.buyPrice;
					cartItems.push(
						<tr key={index}>
							<td><Link to={`/product/${item.productName}`} >{item.productName}</Link></td>
							<td>{item.productScale}</td>
							<td>{item.productVendor}</td>
							<td>{item.productDescription}</td>
							<td>${item.buyPrice}</td>
							<td>${item.MSRP}</td>
						</tr>
					)
					return 'meh'
				
			})
		}
		return(
			<div>
				<h1>cart cart cart</h1>
				<div>
					<button className='btn btn-primary' onClick={this.makePayment} >Pay Now</button>
				</div>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th className='table-head names' >Product Name</th>
							<th className='table-head scale' >Model Scale</th>
							<th className='table-head vendor' >Made By</th>
							<th className='table-head desc' >Description</th>
							<th className='table-head price' >Your Price</th>
							<th className='table-head msrp' >MSRP</th>
						</tr>
					</thead>
					<tbody>
						{cartItems}
					</tbody>
					<tfoot>
						<tr>
							<td>
								Total:
							</td>
							<td>
								${total}
							</td>
						</tr>
					</tfoot>					
				</table>
			</div>

		)
	}
}

function mapStateToProps(state){
	return{
		logged: state.register,
		cart: state.cart,
		checkoutItems: state.checkout
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		checkout: Checkout
	},dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(Cart);