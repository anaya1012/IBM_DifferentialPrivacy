import './Prediction.css';
import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import axios from 'axios';
import { variables } from './Variables';
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
		return result;
	}

	
	render() {
		const result = this.setDatapoints();
		var y1, y2, y3, y1_act, y2_act, y3_act;
		{if(typeof this.state.coordinates.res != 'undefined')
		{
			y1 = this.state.coordinates.res[0]
			y2 = this.state.coordinates.res[1]
			y3 = this.state.coordinates.res[2]
		}}
		{if(typeof this.state.coordinates.actual != 'undefined')
		{
			y1_act = this.state.coordinates.actual[0]
			y2_act = this.state.coordinates.actual[1]
			y3_act = this.state.coordinates.actual[2]
		}}
		const options_scatter = {
			animationEnabled: true,
			exportEnabled: true,
			zoomEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Prediciton results without Differential Privacy"
			},
			axisY: {
				title: "Disease",
				includeZero: false,
				suffix: ""
			},
			axisX: {
				title: "Data points",
				prefix: "",
				interval: 5
			},
			data: [{
				type: "scatter",
				toolTipContent: "DataPoint {x}: {y}",
				dataPoints: result
			}]
		}

		const options_bar = {
			animationEnabled: true,
			exportEnabled: true,
			zoomEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Actual results vs predicted results"
			},
			axisY: {
				title: "Actual",
				interlacedColor: "Azure",
				tickLength: 10,
				interval:20
			  },
			  axisY2: {
				title: "Predicted",
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
		
		return (
			<>
				<div className="chart">
					
					<CanvasJSChart  options = {options_scatter} 
						/* onRef={ref => this.chart = ref} */
					/>
					{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
				</div>
	
				<div className='barGraph'>
					<CanvasJSChart  options = {options_bar} />
				</div>
			</>
		);
	}
}


export default Prediction;