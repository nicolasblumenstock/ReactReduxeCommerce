import React, { Component } from 'react';
import { Form, FormControl, FormGroup, ControlLabel, Button, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import loginAction from '../actions/loginAction';
import { connect } from 'react-redux';

class Login extends Component{
	constructor(props) {
		super(props);
		this.state ={
			message: 'Please Login'
		}
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin(e){
		e.preventDefault();
		var log = {
			userName: e.target[0].value,
			password: e.target[1].value,																																				
		}

		var message = '';
		var error = false;

		if (log.password.length < 8){
			message = 'Password Must Be At Least 8 Characters! ';
			error = true;
		}else{
			
		}

		if (log.userName.length < 4){
			message = 'User Name Needs to Be At Least 4 Characters!';
			error = true;
		}else{
			
		}

		if(error === true){
			this.setState({
				message: message
			})
		}else{
			this.props.loginAction(log);
		}
	}
		
		componentWillReceiveProps(nextProps) {
			// console.log(nextProps.register)
			if ((nextProps.register !== null)){
				// console.log(nextProps)	
				if(nextProps.register.msg === 'ok'){
						nextProps.history.push('/')
					}else if(nextProps.register.msg !== 'ok'){
						this.setState({message: nextProps.register.msg})
					}
				}
			}

	render(){
		return(
			<div className='login-wrapper'>
				<h1>{this.state.message}</h1>
				<Form horizontal onSubmit={this.handleLogin}>
					<FormGroup controlId='formHorizontalName'>
						<Col componentClass={ControlLabel} sm={2}>
							User Name
						</Col>
						<Col sm={10}>
							<FormControl type='text' placeholder='User Name' name='userName'/>
						</Col>
					</FormGroup>				
					<FormGroup controlId='formHorizontalName'>
						<Col componentClass={ControlLabel} sm={2}>
							Parsward
						</Col>
						<Col sm={10}>
							<FormControl type='password' placeholder='Parsward' name='parsward' />
						</Col>
					</FormGroup>
					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button bsStyle='info' bsSize='small' type='submit'>
								Login
							</Button>
						</Col>
					</FormGroup>																			
				</Form>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		register: state.register
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		loginAction: loginAction
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);