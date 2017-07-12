import $ from 'jquery';

var fetchPLines = function(){
	const baseUrl = window.hostAddress + 'productlines/get';
	const thePromise = $.getJSON(baseUrl);
	return{
		type: 'FETCH_PLINES',
		payload: thePromise
	}
}

export default fetchPLines;