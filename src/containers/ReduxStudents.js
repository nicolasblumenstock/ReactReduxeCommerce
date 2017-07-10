import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';

class ReduxStudents extends Component{
	render(){
		var studentArray = [];
		this.props.students.map((student, index)=>{
			studentArray.push(<li key={index} className='taco'>{student}</li>);
			return '1'
		})
		return(
			<div className='App'>
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Dr. Zaius. Dr. Zaius.</h2>
				</div>
				<div>
					<p className="App-intro">
						To get started, edit <code className='notTaco'>src/App.js</code> and save to reload.
					</p>
					<p>
						{studentArray}
					</p>
				</div>
			</div>
		)
	}

}

//all containers that need access to state will have this function. we are creating a mapping between redux state and this compoents props

function mapStateToProps(state){
	//mapStateToProps returns an object with each piece of state that we need
	//from master reducer, we have a 'state' object
	//inside of that state object. we have a property: students.
	//this exists because we made it a property in the rootReducer.

	return{

		students: state.students

	}
}




//instead of exporting the class. we export connect.
export default connect(mapStateToProps)(ReduxStudents);