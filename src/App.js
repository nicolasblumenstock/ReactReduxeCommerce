import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home';
// import NavBar from './containers/NavBar';
import NavBar from './components/NavBar';
import Register from './containers/Register';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductLines from './containers/ProductLines';
import Slick from './components/Slick';
import Login from './containers/Login';
import Contact from './components/Contact';
import About from './components/About';
import Account from './containers/Account';
import Cart from './containers/Cart';

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
					<Route exact path='/login' component={Login} />
					<Route exact path='/contact' component={Contact} />
					<Route exact path='/about' component={About} />
					<Route exact path='/account' component={Account} />
					<Route exact path ='/cart' component={Cart} />
				</div>
			</div>
		</Router>
	);
	}
}

export default App;
