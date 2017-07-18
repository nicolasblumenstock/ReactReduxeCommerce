import React, { Component } from 'react';
import { Form, FormControl, FormGroup, ControlLabel, Button, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import registerAction from '../actions/registerAction';
import {connect} from 'react-redux';
import $ from 'jquery';
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


class Register extends Component{
	constructor(props) {
		super(props);
		this.state = {
			message: 'Register With Us!',
			salesReps: []
		}
		this.handleInfo = this.handleInfo.bind(this);
	}

	componentDidMount() {
		const baseUrl = `${window.hostAddress}salesReps`;
		$.getJSON(baseUrl,(results)=>{
			this.setState({
				salesReps: results
			})
		});
	}

	handleInfo(e){
		e.preventDefault();
		var reg = {
			companyName: e.target[0].value,
			fName: e.target[1].value,
			lName: e.target[2].value,
			userName: e.target[3].value,
			email: e.target[4].value,
			phoneNumber: e.target[5].value,
			accountType: e.target[6].value,
			salesRep: e.target[7].value,
			password: e.target[8].value,
			addressLine1: e.target[9].value,
			addressLine2: e.target[10].value,
			city: e.target[11].value,
			state: e.target[12].value,
			postalCode: e.target[13].value,
			country: e.target[14].value,																																				
		}

		var message = '';
		var error = false;

		if (reg.password.length < 8){
			message = 'Password Must Be At Least 8 Characters! ';
			error = true;
		}else{
			
		}

		if (reg.userName.length < 4){
			message = 'User Name Needs to Be At Least 4 Characters!';
			error = true;
		}else{
			
		}

		if(error === true){
			this.setState({
				message: message
			})
		}else{
			this.props.registerAction(reg);
		}



	}

	componentWillReceiveProps(nextProps) {
	
		if (nextProps.register !== null){		
			if(nextProps.register.msg === 'ok'){
					nextProps.history.push('/')
				}else if(nextProps.register.msg !== 'ok'){
					this.setState({message: nextProps.register.msg})
				}
			}
	}


	render(){
		var reps = [];
		if(this.state.salesReps[0] !== undefined){
			this.state.salesReps.map((s,i)=>{
				reps.push(
					<option value={s.employeeNumber} key={i}>{s.firstName} {s.lastName}</option>
				)
				return 'meh'
			})
		}
		return(
			<div className='register-wrapper'>
				<h1>{this.state.message}</h1>
				<Form horizontal onSubmit={this.handleInfo}>
					<FormGroup controlId='formHorizontalName'>
						<Col componentClass={ControlLabel} sm={2}>
							Company Name
						</Col>
						<Col sm={10}>
							<FormControl type='text' placeholder='Company Name' name='companyName'/>
						</Col>
					</FormGroup>
					<FormGroup controlId='formHorizontalName'>
						<Col componentClass={ControlLabel} sm={2}>
							Contact Name
						</Col>
						<Col sm={5}>
							<FormControl type='text' placeholder='First Name' name='contactFirstName'/>
						</Col>
						<Col sm={5}>
							<FormControl type='text' placeholder='Last Name' name='contactLastName'/>
						</Col>						
					</FormGroup>
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
							Email
						</Col>
						<Col sm={4}>
							<FormControl type='email' placeholder='e@mail.com' name='email' />
						</Col>
						<Col componentClass={ControlLabel} sm={2}>
							Phone Number
						</Col>
						<Col sm={4}>
							<FormControl type='text' placeholder='i.e. 1234567890' name='phoneNumber' />
						</Col>						
					</FormGroup>
					<FormGroup controlId="formAccountSelect">
     			       <Col componentClass={ControlLabel} sm={2}>
         			       Account Type
        			    </Col>
            			<Col sm={4}>
            			    <FormControl componentClass="select" placeholder="formAccountSelect">
                			    <option value="customer">Customer</option>
                    			<option value="employee">Employee</option>
                			</FormControl>    
            			</Col>
						<Col componentClass={ControlLabel} sm={2}>
							Sales Rep
						</Col>
						<Col sm={4}>
							<FormControl componentClass='select' placeholder='Sales Rep You Worked With'>
								{reps}
							</FormControl>
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
					<FormGroup controlId='formHorizontalName'>
						<Col componentClass={ControlLabel} sm={2}>
							Address
						</Col>
						<Col sm={10}>
							<FormControl type='text' placeholder='Address Line 1' name='addressLine1'/>
						</Col>
						<Col smOffset={2} sm={10}>
							<FormControl type='text' placeholder='Address Line 2' name='addressLine2'/>
						</Col>						
					</FormGroup>					
					<FormGroup controlId='formHorizontalName'>
						<Col componentClass={ControlLabel} sm={2}>
							City
						</Col>
						<Col sm={4}>
							<FormControl type='text' placeholder='City' name='city' />
						</Col>
						<Col componentClass={ControlLabel} sm={2}>
							State
						</Col>
						<Col sm={4}>
							<FormControl type='text' placeholder='State' name='state' />
						</Col>
					</FormGroup>
					<FormGroup controlId='formHorizontalName'>
						<Col componentClass={ControlLabel} sm={2}>
							Postal Code
						</Col>
						<Col sm={4}>
							<FormControl type='text' placeholder='Postal Code' name='postalCode' />
						</Col>
						<Col componentClass={ControlLabel} sm={2}>
							Country
						</Col>
						<Col sm={4}>
							<FormControl type='text' placeholder='Country' name='country' />
						</Col>
					</FormGroup>					
					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button bsStyle='info' bsSize='small' type='submit'>
								Register
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

function mapDispatchToProps(dispatcher){
	return bindActionCreators({
		registerAction: registerAction
	}, dispatcher)
}


export default connect(mapStateToProps,mapDispatchToProps)(Register);