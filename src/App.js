import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Students from './Students';


class App extends Component {
	render() {
	return (
		<div className="App">
			<div className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h2>Dr. Zaius. Dr. Zaius.</h2>
			</div>
			<p className="App-intro">
				To get started, edit <code className='notTaco'>src/App.js</code> and save to reload.
			</p>
			<Students />
		</div>
	);
	}
}

export default App;
