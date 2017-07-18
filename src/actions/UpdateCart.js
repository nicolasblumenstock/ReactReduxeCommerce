import $ from 'jquery';


var UpdateCart = function(p){
	// console.log(p)
	var thePromise = $.ajax({
		method: 'POST',
		url: window.hostAddress + 'updateCart',
		data: p
	})

	return{
		type:'UPDATE_CART',
		payload: thePromise
	}
}

export default UpdateCart;