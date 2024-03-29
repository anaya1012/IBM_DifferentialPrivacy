/* eslint-disable react/style-prop-object */
import './Prediction.css';
import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import axios from 'axios';
import { variables } from './Variables';

import {Slider} from '@material-ui/core'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class WithDP extends Component {
	constructor(props){
        super(props);
        this.state={
            coordinates:[],
			res:[],
            res_dp:[]
        }
    }
    
    refreshList(){
        axios.get(variables.API_URL+'prediction')
        .then(response => {
            
            this.setState({
                coordinates: response.data
            });
            
        });
        //console.log(this.state.coordinates)
    }
    componentDidMount(){
        this.refreshList();
		
    }

	setDatapoints(){
		const result=[]
		for (let i = 0; i < 100; i++) {
			if(typeof this.state.coordinates.x != 'undefined')
			{
				result.push({x:this.state.coordinates.x[i],y:(this.state.coordinates.y_dp[i])+1})
			}
			
		}
		
		return result;
	}
	handleChange= (e,val)=>{		
		this.setState({	epsilon: val});
		console.log(val)
	}
	
	handleStop=()=>{
		console.log("Stopped", this.state.epsilon)
		axios.post(variables.API_URL+'prediction', this.state.epsilon)
        this.refreshList();
		this.chart.render();
	}
	render() {
		const result = this.setDatapoints();
		var accuracy_score,remaining;
		var y1, y2, y3, y1_act, y2_act, y3_act;
		// eslint-disable-next-line no-lone-blocks
		{if(typeof this.state.coordinates.res != 'undefined')
		{
			y1 = this.state.coordinates.res_dp[0]
			y2 = this.state.coordinates.res_dp[1]
			y3 = this.state.coordinates.res_dp[2]
		}}
		// eslint-disable-next-line no-lone-blocks
		{if(typeof this.state.coordinates.actual != 'undefined')
		{
			y1_act = this.state.coordinates.actual[0]
			y2_act = this.state.coordinates.actual[1]
			y3_act = this.state.coordinates.actual[2]
		}}
		// eslint-disable-next-line no-lone-blocks
		{if(typeof this.state.coordinates.acc != undefined)
			{
				accuracy_score=this.state.coordinates.acc_dp;
				
			}
		}
		// eslint-disable-next-line no-lone-blocks
		{if(typeof this.state.coordinates.rem != undefined)
			{
				
				remaining=this.state.coordinates.rem_dp;
			}
		}
		console.log(remaining)
		const options_bar = {
			animationEnabled: true,
			exportEnabled: true,
			zoomEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Actual results vs predicted results"
			},
			axisY: {
				title: "Predicted",
				interlacedColor: "Azure",
				tickLength: 10,
				interval:20
			  },
			  axisY2: {
				title: "Actual",
				tickLength: 10,
				interval: 20
			  },
			  axisX: {
			  },
			  data: [
				{ 
				  showInLegend: true,           
				  legendText: "Predicted disease",
				  dataPoints: [
				  {label: "Mitochondrial GID", y: y1 },
				  {label: "Multifactorial GID", y: y2},
				  {label: "Single-gene ID", y: y3},
				  
				  ]
				},
				{        
				  showInLegend: true, 
				  legendText: "Actual disease",
				  axisYType: "secondary",
				  dataPoints: [
				  {label: "Mitochondrial GID", y: y1_act },
				  {label: "Multifactorial GID", y: y2_act},
				  {label: "Single-gene ID", y: y3_act},
				  ]
				}
		  
				]
			
		}
		
		const options_scatter = {
			animationEnabled: true,
			exportEnabled: true,
			zoomEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Prediciton results with Differential Privacy"
			},
			toolTip:{   
				
				shared: true,
				contentFormatter: function(e){
					
					var content = " ";
					const	diseaseName = ['', 'Mitochondrial genetic inheritance disorders',
 					'Multifactorial genetic inheritance disorders',
 					'Single-gene inheritance diseases','']

					 for (var i = 0; i < e.entries.length; i++) {
						content += e.entries[i].dataPoint.x +" : " + "<strong>" + diseaseName[e.entries[i].dataPoint.y] + "</strong>";
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
		const options_doughnut = {
			


			animationEnabled: true,
	title:{
		text: "Prediction Accuracy",
		horizontalAlign: "center"
	},
subtitles: [{
				text: accuracy_score +"%",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
	data: [{
		type: "doughnut",
		startAngle: 60,
		//innerRadius: 60,
		indexLabelFontSize: 17,
		
		toolTipContent: "<b>{label} </b> {y} (#percent%)",
		dataPoints: [
			{ y: accuracy_score, label: "" },
			{ y: remaining, label: "" }
		]
	}],
	};
		return (
			<>
			 
		<div className="chart">
			
			<CanvasJSChart  options = {options_scatter} 
				 onRef={ref => this.chart = ref} 
			/>
			</div>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			
			<div className='graphs'>
			
			<div className="doughnutChart">
			<CanvasJSChart options = {options_doughnut} 
				/* onRef={ref => this.chart = ref} */
			/>
		</div>
		<div className='barGraph' >
					<CanvasJSChart  options = {options_bar} />
				</div>
				</div>
				<div className='slider'>
				<Slider 
					onChange = {this.handleChange}
					onChangeCommitted = {this.handleStop}
					aria-label="Epsilon"
					defaultValue={30}	
					valueLabelDisplay="auto"
					step={10}
					marks
					min={10}
					max={110}
				/>
				</div>
		</>
		);
	}
}


export default WithDP;