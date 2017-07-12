import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home';
// import NavBar from './containers/NavBar';
import NavBar from './components/NavBar';
import Register from './containers/Register';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductLines from './containers/ProductLines';
import Slick from './components/Slick';



class App extends Component {
	render() {
	return (
		<Router>
			<div className="App">
				<NavBar />
	        	<Route exact={true} path="/" component={Slick} />				
				<div className='container main'>
					<Route exact path='/' component={Home} />				
					<Route exact path='/register' component={Register} />
					<Route exact path='/shop/:pl' component={ProductLines} />
				</div>
			</div>
		</Router>
	);
	}
}

export default App;
