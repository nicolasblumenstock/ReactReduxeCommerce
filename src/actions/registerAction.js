import $ from 'jquery';

var registerAction = function(object){
	const baseUrl = `${window.hostAddress}register`;
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

export default registerAction;