import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


class Slick extends Component{
	render(){
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
		}
		return(
			<div className='main container-fluid'>
				<Slider {...settings}>
					<div className='slick-image'><img src='/images/ferrari.jpg' alt='honk'/></div>
					<div className='slick-image'><img src='/images/schooner.jpg' alt='honk'/></div>
					<div className='slick-image'><img src='/images/lamb.jpg' alt='beep'/></div>
					<div className='slick-image'><img src='/images/train1.jpg' alt='beep' /></div>
				</Slider>
			</div>
		)
	}

}

export default Slick;