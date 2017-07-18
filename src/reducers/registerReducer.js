var registerReducer = function(state = null, action){
	// console.log(action.payload)
	switch(action.type){
		case 'REGISTER':
		console.log(action.payload.name)
			return {
				msg: action.payload.msg,
				name: action.payload.name,
				token: action.payload.token
			};
		default:
			return state;	
	}
}

export default registerReducer;