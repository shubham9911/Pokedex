import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './home.css';
import * as boot from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './card';

const Home = (props) => {
	const [data, setData] = useState('');
	const [pageNum, setPageNum] = useState(0);
	const [names, setNames] = useState();
	// const [search, setSearch] = useState('');
	const [searchCard, setSearchCard] = useState(false);
	const [searchurl, setSearchurl] = useState('');

	useEffect(() => {
		let page = pageNum * 20;
		let url = 'https://pokeapi.co/api/v2/pokemon?offset=' + page + '&limit=20';
		console.log(url);
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
	}, [pageNum]);

	useEffect(() => {
		let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=200';
		axios
			.get(url)
			.then(function (response) {
				// handle success
				console.log(response);

				let items = response.data.results.map((res, i) => {
					return { value: res.name, label: res.name };
				});
				setNames(items);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}, []);

	const handleSearch = (e) => {
		console.log(e);
		setSearchCard(true);

		setSearchurl('https://pokeapi.co/api/v2/pokemon/' + e.value);
	};

	return (
		<>
			<div className='container text-center'>
				<div className='row mt-5'>
					<div className='col-lg-8 col-sm-12 my-2'>
						<Select
							options={names}
							onChange={(e) => handleSearch(e)}
							placeholder={<div>Search your Pokemone..</div>}
						/>
						{/* <boot.Form.Control
							type='text'
							placeholder='Search your Pokemone...'
							className='w-auto search'
							onChange={(e) => setSearch(e.target.value)}
						/> */}
					</div>
					<div className='col-lg-4 col-sm-12 my-2'>
						<boot.Form.Select aria-label='Default select example'>
							<option>Select Type</option>
							<option value='1'>One</option>
							<option value='2'>Two</option>
							<option value='3'>Three</option>
						</boot.Form.Select>
					</div>
				</div>
				{searchCard === true ? (
					<>
						<div className='row my-5'>
							<div className='col-lg-4 col-sm-12 my-3'>
								<Card url={searchurl} />
							</div>
						</div>
						<boot.Button
							variant='danger'
							className='w-auto next_btn'
							onClick={() => setSearchCard(false)}>
							close
						</boot.Button>
					</>
				) : (
					<>
						<div className='row my-5'>
							{/* {console.log(data.results)} */}
							{data.results?.map((item, idx) => (
								<>
									<div key={idx} className='col-lg-4 col-sm-12 my-3'>
										<Card url={item.url} />
									</div>
								</>
							))}
						</div>

						<div className='pb-5'>
							<boot.Button
								variant='primary'
								className='w-auto prev_btn'
								onClick={() => setPageNum(pageNum - 1)}
								disabled={pageNum === 0 ? true : false}>
								Previous
							</boot.Button>
							<boot.Button
								variant='primary'
								className='w-auto next_btn'
								onClick={() => setPageNum(pageNum + 1)}>
								Next
							</boot.Button>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Home;
