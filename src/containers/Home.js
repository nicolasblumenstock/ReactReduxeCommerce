import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
	render(){
		return(
			<h1>ok</h1>

		)
	}
}

function mapStateToProps(state){
	return{

		stuff: state.stuff

	}
}

export default connect(mapStateToProps)(Home);