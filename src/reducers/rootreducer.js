//this is our master reducer.
//the root reducer
//the reducer hold pieces of state
//the root reducer holds all reducers
// it holds all pieces of state.

import { combineReducers } from 'redux';

// reducers
import plReducer from './plReducer';
import ProductReducer from './ProductReducer';

const rootReducer = combineReducers({
	//inside here we pass each reducer as a key/value
	//each key will be available as a piece of state later

	productLine: plReducer,
	products: ProductReducer

})

export default rootReducer