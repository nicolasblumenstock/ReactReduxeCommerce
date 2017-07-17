import $ from 'jquery';

var loginAction = function(object){
	const baseUrl = `${window.hostAddress}login`;
	const thePromise = $.ajax({
		type: 'POST',
		url: baseUrl,
		data: object
	});	
	return{
		type: 'REGISTER',
		payload: thePromise
	}
}

export default loginAction;