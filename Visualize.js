/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-undef */

import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import axios from 'axios';
import { variables } from './Variables';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Visualize extends Component {

  constructor(props){
    super(props);

    this.state={
      selected:'',
      coordinates:[]
    }
}
  render(){
  //const [selected, setSelected] = React.useState("");
  var y1,y2,y3;
  {if(typeof this.state.coordinates.y != 'undefined')
		{
			y1 = this.state.coordinates.y[0]
			y2 = this.state.coordinates.y[1]
			y3 = this.state.coordinates.y[2]
		}}
   const getattributevalue=()=>{
    axios.post(variables.API_URL+'visualize', this.state.selected)
    .then(response => this.setState({ coordinates: response.data }));
     console.log(this.state.coordinates.y)
   }
  const changeSelectOptionHandler = (event) => {
    
    this.setState({
      selected: event.target.value
  });
  this.chart.render();
  };
  
  /** Different arrays for different dropdowns */
  const categorical = [
    "Choose type of graph",
    "Bar  graph",
    "Pie chart"
  ];
  const numerical = ["Choose type of graph","Box plot","Scatter plot","Line graph"];
  
  
  /** Type variable to store different array for different dropdown */
  let type = null;
  
  /** This will be used to create set of options that user will see */
  let options = null;
  
  if (this.state.selected === "Genes in mother's side" ||
  this.state.selected === "Inherited from father" ||
  this.state.selected === "Maternal gene" ||
  this.state.selected === "Paternal gene" ||
  this.state.selected === "Respiratory Rate (breaths/min)" ||
  this.state.selected === "Heart Rate (rates/min" ||
  this.state.selected === "Gender" ||
  this.state.selected === "Birth asphyxia"||
  this.state.selected === "Autopsy shows birth defect (if applicable)"||
  this.state.selected === "Folic acid details" ||
  this.state.selected ==="H/O serious maternal illness"||
  this.state.selected ==="H/O radiation exposure (x-ray)"||
  this.state.selected === "H/O substance abuse" ||
  this.state.selected ==="Assisted conception IVF/ART" ||
  this.state.selected ==="History of anomalies in previous pregnancies"||
  this.state.selected ==="Birth defects"||
  this.state.selected ==="Symptom 1"||
  this.state.selected ==="Symptom 2"||
  this.state.selected ==="Symptom 3"||
  this.state.selected ==="Symptom 4"||
  this.state.selected ==="Symptom 5"||
  this.state.selected ==="Genetic Disorder"||
  this.state.selected ==="Disorder Subclass"
  ) {
    type = categorical;
  } else if(this.state.selected=== "Patient Age"||
  this.state.selected=== "Blood Cell count"||
  this.state.selected==="White Blood cell count (thousand per microliter)"||
  this.state.selected==="Mother's age"||
  this.state.selected==="No. of previous abortion)")  {
    type=numerical
  }
  
  /** If "Type" is null or undefined then options will be null,
   * otherwise it will create a options iterable based on our array
   */
  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
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
        {label: "0", y: y1 },
        {label: "1", y: y2},
        {label: "2", y: y3},
        
        ]
      },
      
    
      ]
    
  }
  return (
    
    <>
    
    
    <div
      style={{
        padding: "16px",
        margin: "16px",
        marginLeft:"400px",
      }}
    >
      <form>
        <div>
          {/** Bind changeSelectOptionHandler to onChange method of select.
           * This method will trigger every time different
           * option is selected.
           */}
          <select onChange={changeSelectOptionHandler}>
            <option>Choose Genomic attributes</option>
            <option>Inherited from father</option>
            <option>Maternal gene</option>
            <option>Paternal gene</option>
            <option>Respiratory Rate (breaths/min)</option>
            <option>Heart Rate (rates/min</option>
            <option>Gender</option>
            <option>Birth asphyxia</option>
            <option>Autopsy shows birth defect (if applicable)</option>
            <option>Folic acid details</option>
            <option>H/O radiation exposure (x-ray)</option>
            <option>H/O serious maternal illness</option>
            <option>H/O substance abuse </option>
            <option>Assisted conception IVF/ART </option>
            <option>History of anomalies in previous pregnancies</option>
            <option>Birth defects</option>
            <option>Symptom 1</option>
            <option>Symptom 2</option>
            <option>Symptom 3</option>
            <option>Symptom 4</option>
            <option>Symptom 5</option>
            <option>Genetic Disorder</option>
            <option>Disorder Subclass</option>
            <option>Patient Age</option>            
            <option>Blood Cell count</option>
            <option>White Blood cell count (thousand per microliter)</option>
            <option>Mother's age</option>
            <option>No. of previous abortion</option>
          </select>
        </div>
        <div>
          <select onChange={getattributevalue}>
            {
              /** This is where we have used our options variable */
              options
            }
          </select>
        </div>
      </form>

    </div>
     <CanvasJSChart options = {options_bar} 
				 onRef={ref => this.chart = ref} 
				// onRef={this.setState({chartRef:this.chart})}
			/> 
    </>
  );
          }
};
  
export default Visualize;