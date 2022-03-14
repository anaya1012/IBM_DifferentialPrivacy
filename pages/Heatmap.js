/* eslint-disable react/style-prop-object */
import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import axios from 'axios';
import { variables } from './Variables';
import HeatMap from "react-heatmap-grid";





class HeatmapView extends Component {
	constructor(props){
        super(props);
        this.state={
            coordinates:[[0,0]],
			res:[],
            res_dp:[],
            
        }
    }
    
    refreshList(){
        var x;
        axios.get(variables.API_URL+'visualize')
        .then(response => {
            
            this.setState({
                coordinates: response.data
                
            });
            console.log(response.data);
            x = response.data;
        });
        // console.log(this.state.coordinates)
        return Array.from(x);
    }
    // componentDidMount(){
    //     this.refreshList();
		
    // }

	
	
	
	render() {
        const xLabels = new Array(30).fill(0).map((_, i) => `${i}`);
const yLabels = new Array(30).fill(0).map((_, i) => `${i}`);

        var head_data = this.refreshList();
        console.log(head_data)
        console.log(this.state.coordinates)
        
  
        return (
            // <HeatMap  data={this.state.coordinates} />
            //<div>hi</div>
            
           <HeatMap xLabels={xLabels} yLabels={yLabels} data={refreshList()} />
        )
      }
}


export default HeatmapView;


