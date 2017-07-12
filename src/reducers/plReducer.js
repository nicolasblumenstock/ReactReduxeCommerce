var plReducer = function(state = [], action){
	switch(action.type){
		case 'FETCH_PLINES':
			return action.payload;
		default:
			return state;
	}
}

export default plReducer;