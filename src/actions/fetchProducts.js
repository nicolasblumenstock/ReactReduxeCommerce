import $ from 'jquery';

var fetchProducts = function(pl){
	const baseUrl = `${window.hostAddress}products/get/${pl}`;
	const thePromise = $.getJSON(baseUrl);
	return{
		type: 'FETCH_PRODUCTS',
		payload: thePromise
	}
}

export default fetchProducts;