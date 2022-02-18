import './Prediction.css';
import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import axios from 'axios';
import { variables } from './Variables';

import TabsComponent from '../Components/Tabs';


import WithDP from './WithDP';

import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Prediction extends Component {
	constructor(props){
        super(props);
        this.state={
            coordinates:[],
			res:[]
        }
    }
    
    refreshList(){
        axios.get(variables.API_URL+'prediction')
        .then(response => {
            console.log(response.data.x[0]);
            this.setState({
                coordinates: response.data
            });
            
        });
        console.log(this.state.coordinates)
    }
    componentDidMount(){
        this.refreshList();
		
    }

	setDatapoints(){
		const result=[]
		for (let i = 0; i < 100; i++) {
			if(typeof this.state.coordinates.x != 'undefined')
			{
				result.push({x:this.state.coordinates.x[i],y:(this.state.coordinates.y[i])+1})
			}
			
		}
		console.log(result)
		console.log(this.state.res)
		console.log(this.state.coordinates.x)
		console.log(typeof this.state.coordinates.x)
		return result;
	}
	render() {
		const result = this.setDatapoints();
		console.log(result)
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			zoomEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Prediciton results without Differential Privacy"
			},
			toolTip:{   
				
				shared: true,
				contentFormatter: function(e){
					
					var content = " ";
					const	diseaseName = ['', 'Mitochondrial genetic inheritance disorders',
 					'Multifactorial genetic inheritance disorders',
 					'Single-gene inheritance diseases','']

					 for (var i = 0; i < e.entries.length; i++) {
						content += e.entries[i].dataPoint.x +" : "+ "<strong>" + diseaseName[e.entries[i].dataPoint.y] + "</strong>";
						content += "<br/>";
					}
					return content;
					 
						
				}
			},
			axisY: {
				title: "Disease",
				includeZero: false,
				suffix: "",
		
					labelFormatter: function(e){

					 const	diseaseName = ['', 'Mitochondrial genetic inheritance disorders',
 					'Multifactorial genetic inheritance disorders',
 					'Single-gene inheritance diseases','']
						return diseaseName[e.value];
					
				}
			},
			axisX: {
				title: "Data points",
				prefix: "",
				interval: 5
			},
			data: [{
				type: "scatter",
				dataPoints: result,
				
			}]
		}

		
			
		
		return (
		<>


		
		
			 <TabsComponent/> 
			

			
			
				
			<div className="chart">
				
				<CanvasJSChart  options = {options} 
					/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>

		

		</>
		);
	}
}


export default Prediction;