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

	const [chatbtn, setButton] = useState(false);

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
			
        	<Grid container style={{
        backgroundColor: '#E6E6FA'}}>
				<Grid item lg>
					<div className='video'>
						
						<iframe width="600" height="315" src="https://www.youtube.com/embed/gI0wk1CXlsQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
						</iframe>
						<p>This video
depicts the concept of differential privacy, in simpler terms. By
using differential privacy in the training process, a machine learning model
can be trained to accurately represent the dataset at large, but without revealing
sensitive information about an individual. Diffprivlib is the first library of its
kind to leverage the power of differential privacy with scikit-learn and numpy
to give data scientists and researchers access to the tools to train accurate,
portable models with robust, provable privacy guarantees built-in. In this
talk, we will introduce attendees to the idea of differential privacy, why it
is necessary in today's world, and how diffprivlib can be seamlessly integrated
within existing scripts to protect your trained models from privacy
vulnerabilities. Attendees will be expected to have a basic understanding of
sklearn.No knowledge of data privacy or differential privacy will be assumed or
required.</p>
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
										<p>U.S. Census Bureau started to use differential privacy with
     the 2020 Census data. The dataset contains
     detailed demographic information about U.S. citizens. Without a privacy
     measure, this information can be traced back to individuals. The Bureau
     states that traditional anonymization techniques became obsolete. This is
     because of re-identification
     methods that make it possible to reveal information of a
     specific individual from an anonymized dataset.
 
In 2014, Google introduced a differential privacy tool called Randomized Aggregatable Privacy-Preserving Ordinal
     Response (RAPPOR) to Chrome browsers. It helps Google to
     analyse and draw insights from browser usage while preventing sensitive
     information from being traced. Google also made its differential privacy libraries open
     source in 2019.
 
Apple uses differential privacy in iOS and
     macOS devices for personal data such as emojis, search queries and health
     information.
 
Differential privacy is also used in applications of other
     privacy-preserving methods in artificial intelligence such as federated
     learning or synthetic data generation.</p>	
							</Carousel.Item>
							<Carousel.Item interval={1500}>
								<img
									className="d-block w-100"
									src="https://cdn.comparitech.com/wp-content/uploads/2020/04/What-is-differential-privacy-and-how-does-it-protect-your-data-1.jpg"
									alt="Image Two"
								/>
							<p>U.S. Census Bureau started to use differential privacy with
     the 2020 Census data. The dataset contains
     detailed demographic information about U.S. citizens. Without a privacy
     measure, this information can be traced back to individuals. The Bureau
     states that traditional anonymization techniques became obsolete. This is
     because of re-identification
     methods that make it possible to reveal information of a
     specific individual from an anonymized dataset.
 
In 2014, Google introduced a differential privacy tool called Randomized Aggregatable Privacy-Preserving Ordinal
     Response (RAPPOR) to Chrome browsers. It helps Google to
     analyse and draw insights from browser usage while preventing sensitive
     information from being traced. Google also made its differential privacy libraries open
     source in 2019.
 
Apple uses differential privacy in iOS and
     macOS devices for personal data such as emojis, search queries and health
     information.
 
Differential privacy is also used in applications of other
     privacy-preserving methods in artificial intelligence such as federated
     learning or synthetic data generation.</p>
					</Carousel.Item>
			

			
							
						</Carousel>
						
						</div>
						</Grid>

						
						<div className='chat'><button className='chatBtn' onClick={btnHandler}><img src={Botmodified} border="0" height="60" width="60" /></button></div>
							{/* <img src={Botmodified} border="0" height="60" width="60" /> */}
							{chatbtn && <div className='chatbot'>
							<header>
								<h1><p><p><Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider}/></p></p></h1>
							</header>
						</div>}


						<div className="flip-card">
       <div className="flip-card-inner">
          <div className="flip-card-front">
             <img src= "https://miro.medium.com/max/1400/1*4ereQYh-7G_aIpt4V2X68A.png"
             alt="Avatar" />
          </div>
          <div className="flip-card-back">
           <h1>Epsilon</h1>
           <p>It is the maximum distance between a query on database (x) and the same query on database (y). That is, its a metric of privacy loss at a differential change in data (i.e., adding or removing 1 entry). Also known as the privacy parameter or the privacy budget.</p>
           
          </div>
        </div>
    </div>

	<div className="flip-card2">
       <div className="flip-card-inner2">
          <div className="flip-card-front2">
		  <img src= "https://i.stack.imgur.com/BxojF.png"
             alt="Avatar" />
          </div>
          <div className="flip-card-back2">
           <h1>General sensitivity</h1>
           <p>Generally sensitivity refers to the impact a change in the underlying data set can have on the result of the query. Let xA, xB be any data set from all possible data set of X differing in at most one element.</p>
           
          </div>
        </div>
    </div>
					
				
		</Grid>
		
	</>
    )
}

export default Home;