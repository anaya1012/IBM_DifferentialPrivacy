import React from 'react'
import './Home.css';

import 'react-chatbot-kit/build/main.css';
import { Chatbot } from 'react-chatbot-kit';
import MessageParser from './chatbot/MessageParser';
import ActionProvider from './chatbot/ActionProvider';
import config from './chatbot/config';

import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';

import Botmodified from './chatbot/Botmodified.png';

import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';

function Home() {

	const [chatbtn, setButton] = useState(true);

	const btnHandler = () =>{
		setButton(!chatbtn);
		console.log(chatbtn)
	}
    return (
		<>
			{/* <AppBar position="static">
				<Toolbar>
					<Typography variant="headline" color="white">
						Differential Privacy
					</Typography>
				</Toolbar>
			</AppBar> */}
        	<Grid container>
				<Grid item lg>
					<div className='video'>
						<iframe width="600" height="315" src="https://www.youtube.com/embed/gI0wk1CXlsQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
						</iframe>
					</div>
				</Grid>
				<Grid item lg>
					<div className='Carousel-item' style={{ display: 'block', width: 700, padding: 30}}>
						<h4>What's new in differential privacy</h4>
			
						<Carousel >
							<Carousel.Item interval={1500}>
								<img
									className="d-block w-100"
									src="https://lh4.googleusercontent.com/p_KXdjxhxihoFoCOJ_MxxLq87LXwQQEZzfKpvBbKawUi8AryWx1ZD2uSNiX8R3NQuDGQat2hPxNDNbkC7yv6aIb4m3LXZCVMkxDHTjYkZRfwhCdJ-G-Dj4pj21XUFSZQyD-xPnMz=s0"
									alt="Image One"
								/>		
							</Carousel.Item>
							<Carousel.Item interval={1500}>
								<img
									className="d-block w-100"
									src="https://cdn.comparitech.com/wp-content/uploads/2020/04/What-is-differential-privacy-and-how-does-it-protect-your-data-1.jpg"
									alt="Image Two"
								/>
					
							</Carousel.Item>
						</Carousel>
	
						<div className='chat'><button className='chatBtn' onClick={btnHandler}><img src={Botmodified} border="0" height="60" width="60" /></button></div>
							{/* <img src={Botmodified} border="0" height="60" width="60" /> */}
							{chatbtn && <div className='chatbot'>
							<header>
								<h1><p><p><Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider}/></p></p></h1>
							</header>
						</div>}


					</div>
				</Grid>
		</Grid>
	</>
    )
}

export default Home;