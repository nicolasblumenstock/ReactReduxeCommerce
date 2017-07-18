var CheckoutReducer = function(state = null, action){
	switch(action.type){
		case 'CHECKOUT':
			return action.payload;
		default:
			return state;	
	}
}

export default CheckoutReducer;