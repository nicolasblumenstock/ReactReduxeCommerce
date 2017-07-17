var registerReducer = function(state = null, action){
	switch(action.type){
		case 'REGISTER':
			return action.payload;
		default:
			return state;	
	}
}

export default registerReducer;