import $ from 'jquery';

var Checkout = function(cart){
	// console.log(cart)
	const url = window.hostAddress + 'checkout';
	var thePromise = $.ajax({
		type: 'POST',
		url: url,
		data: {token: cart}
	});
	return{
		type: 'CHECKOUT',
		payload: thePromise
	}
}

export default Checkout;