import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './modal.css';

const modal = (props) => {
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title
					className='text-capitalize'
					id='contained-modal-title-vcenter'>
					{props.data.name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-lg-6'>
							<img className='main_img' src={props.image} alt='poki' />
						</div>
						<div className='col-lg-6'>
							<ul>
								<li>
									<strong>Height: </strong>
									{props.data.height}cm
								</li>
								<li>
									<strong>Weight: </strong>
									{props.data.weight}kg
								</li>
								<li>
									<strong>Abilities: </strong>
									{props.data.abilities?.map((item, idx) => (
										<span key={idx}>{item.ability.name}, </span>
									))}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default modal;
