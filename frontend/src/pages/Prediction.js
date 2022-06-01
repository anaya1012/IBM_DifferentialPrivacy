/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/style-prop-object */
import './Prediction.css';
import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import axios from 'axios';
import { variables } from './Variables';
import Joyride from 'react-joyride';
import Card from '@material-ui/core/Card';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Prediction extends Component {
	constructor(props){
        super(props);
		this.chartRef=React.createRef();
        this.state={
            coordinates:[],
			res:[],
			
        }
    }
    
	state = {
		steps: [
		  {
			target: '.doughnutChart',
			content: 'This is my awesome feature!',
		  },
		//   {
		// 	target: '.my-other-step',
		// 	content: 'This another awesome feature!',
		//   },
		  
		]
	  };
	

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
				result.push({x:this.state.coordinates.x[i],y:(this.state.coordinates.y[i])+1})
			}
			
		}
		/*console.log(result)
		console.log(this.state.res)
		console.log(this.state.coordinates.x)
		console.log(typeof this.state.coordinates.x)
		*/
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

		const { steps } = this.state;
		const result = this.setDatapoints();
		var accuracy_score,remaining;
		var y1, y2, y3, y1_act, y2_act, y3_act;
		// eslint-disable-next-line no-lone-blocks
		{if(typeof this.state.coordinates.res != 'undefined')
		{
			y1 = this.state.coordinates.res[0]
			y2 = this.state.coordinates.res[1]
			y3 = this.state.coordinates.res[2]
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
				accuracy_score=this.state.coordinates.acc;
				
			}
		}
		// eslint-disable-next-line no-lone-blocks
		{if(typeof this.state.coordinates.rem != undefined)
			{
				
				remaining=this.state.coordinates.rem;
			}
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
		startAngle: 90,
		toolTipContent: "<b>{label} </b> {y} (#percent%)",
		dataPoints: [
			{ y: accuracy_score, label: "" },
			{ y: remaining, label: "" }
		]
	}],
	};
		return (
			<>
			  <div className="app">
        <Joyride
          steps={steps}
          
        />
		</div>
		<div className="chart">
		<Card style={{
							boxShadow: "0 5px 8px 0",
						}}>
			<CanvasJSChart  options = {options_scatter} 
				/* onRef={ref => this.chart = ref} */
			/>
			</Card>
			</div>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			
			<div className='graphs'>
			
			<div className="doughnutChart">
			<Card style={{
							width:"98%",
							boxShadow: "0 5px 8px 0",
						}}>
			<CanvasJSChart options = {options_doughnut} 
				 onRef={ref => this.chart = ref} 
				// onRef={this.setState({chartRef:this.chart})}
			/>
			 {/* {console.log(this.chart)}
			 {this.setState({chartRef:this.chart})}
			 {console.log(this.state.chartRef)} */}
			 {/* {this.chartRef=this.chart.current} */}
			</Card>
		</div>
		<div className='barGraph' >
		<Card style={{
							width:"98%",
							boxShadow: "0 5px 8px 0",
						}}>
					<CanvasJSChart  options = {options_bar} />
					</Card>
				</div>
				</div>
				
				
		</>
		);
	}
}


export default Prediction;