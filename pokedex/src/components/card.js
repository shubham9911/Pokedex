import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './card.css';
import * as boot from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyVerticallyCenteredModal from './modal';

const Card = ({ url }) => {
	const [data, setData] = useState('');
	const [modalShow, setModalShow] = React.useState(false);

	useEffect(() => {
		axios
			.get(url)
			.then(function (response) {
				// handle success
				console.log(response);
				setData(response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}, [url]);

	let src =
		'https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/' +
		data.id +
		'.svg';
	return (
		<>
			<boot.Card>
				<boot.Card.Img className='main_img' variant='top' src={src} />
				<boot.Card.Body className='text-capitalize'>
					<boot.Card.Title>{data.name}</boot.Card.Title>
					<boot.Card.Text className='text-left'>
						<ul>
							<li>
								<strong>Id: </strong>
								{data.id}
							</li>
							<li>
								<strong>Type: </strong>
								{data.types?.map((item) => (
									<span>{item.type.name}, </span>
								))}
							</li>
						</ul>
					</boot.Card.Text>
					<boot.Button variant='primary' onClick={() => setModalShow(true)}>
						View Stats
					</boot.Button>
				</boot.Card.Body>
			</boot.Card>

			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				image={src}
				data={data}
			/>
		</>
	);
};

export default Card;
