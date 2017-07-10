import React, {Component} from 'react';


class Students extends Component{
	constructor(props) {
		super(props);
		this.state={
			students: []
		}
	}
	
	componentDidMount() {
		var students = [
			'Hayes',
			'Michael',
			'Carla',
			'YingRong'
		]

		this.setState({
			students: students
		})
	}


	render(){
		var studentArray = [];
		this.state.students.map((student, index)=>{
			studentArray.push(<li key={index} className='taco'>{student}</li>);
			return '1'
		})

		return(
			<div>
				<h1>food? <span className='notTaco'>food.</span></h1>
				<ul>
					{studentArray}
				</ul>
			</div>
		)
	}




}

export default Students;