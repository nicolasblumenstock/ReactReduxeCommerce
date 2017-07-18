var CartReducer = function(state = [], action){
	switch(action.type){
		case 'UPDATE_CART':
			return action.payload;
		case 'REGISTER':
			return action.payload.cart;
		default: 
			return state;
	}
}

export default CartReducer;