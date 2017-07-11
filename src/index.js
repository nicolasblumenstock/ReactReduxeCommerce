import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
// import registerServiceWorker from './registerServiceWorker';
// import rootReducer from './reducers/rootreducer.js';


import { createStore } from 'redux';
//allows redux and react to talk
import { Provider } from 'react-redux';

import reducers from './reducers/rootreducer.js';

const theStore = createStore(reducers)


//reactDom.render takes two args. what and where.

ReactDOM.render(
	<Provider store={theStore}>
		<App />
	</Provider>,
	document.getElementById('root'));
// registerServiceWorker();
