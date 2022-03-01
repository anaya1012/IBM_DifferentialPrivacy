/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-undef */

import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import axios from 'axios';
import { variables } from './Variables';
import Switch from 'react-switch';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Visualize extends Component {

  constructor(props){
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.state={
      checked: false,
      selected:'',
      coordinates:[]
    }
}
setDatapoints(){

  const result=[];
  // console.log(this.state.coordinates.x)
  
  if(typeof this.state.coordinates.x != 'undefined')
    {
      console.log(this.state.coordinates)
      for (let i = 0; i < this.state.coordinates.x.length; i++) {
        console.log(this.state.coordinates.x.length)
          result.push({x:this.state.coordinates.x[i],y:(this.state.coordinates.y[i])})
        }
    }
    console.log(result)
  return result;
}
handleChange(checked) {
  this.setState({ checked });
  console.log(this.state.checked)
  axios.post(variables.API_URL+'visualize',  { selected: this.state.selected,dpcheck: this.state.checked }).then(response => this.setState({ coordinates: response.data }));
}
  render(){
  //const [selected, setSelected] = React.useState("");
  const dataPoints=this.setDatapoints();
  console.log(dataPoints)
   const getattributevalue=()=>{

    axios.post(variables.API_URL+'visualize', { selected: this.state.selected,dpcheck: this.state.checked })
    .then(response => this.setState({ coordinates: response.data }));
    
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ selected: this.state.selected,dpcheck: this.state.checked })
  // };
  // fetch(variables.API_URL+'visualize', requestOptions)
  //     .then(response => response.json())
  //     .then(data => this.setState({  coordinates:data }));


    // axios({
    //   method: 'post',
    //   url: variables.API_URL+'visualize',
    //   body: JSON.stringify({
    //     selected: this.state.selected,
    //     dpcheck: this.state.checked 
    //   })
    // }).then(response => this.setState({ coordinates: response.data }));


    // const data={
    //        selected: this.state.selected,
    //       //  dpcheck: this.state.checked 
    //      };
    // axios.post(variables.API_URL+'visualize', {'abc':this.state.selected})
    // .then(response => this.setState({ coordinates: response.data }));
    //  //console.log(this.state.coordinates.y)
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
    toolTip:{   
				
      shared: true,
      contentFormatter: function(e){
        
        var content = " ";
        const	categoryname = this.state.coordinates.x_labels
         for (var i = 0; i < e.entries.length; i++) {
          content += e.entries[i].dataPoint.x +" : " + "<strong>" + categoryname[e.entries[i].dataPoint.y] + "</strong>";
          content += "<br/>";
        }
        return content;
         
          
      }
    },
    axisY: {
      title: "Attribute",
      interlacedColor: "Azure",
      tickLength: 10,
      interval:5000
      },
    
      axisX: {
        title: "Categories",
      tickLength: 10,
      interval:1,
      labelFormatter: function(e){

        const	categories = ['Yes','No']
         return categories[e.value];
      },
      },
      data: [
      { 
        showInLegend: true,           
        legendText: "Predicted disease",
        dataPoints: dataPoints 
      
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
      <label htmlFor="material-switch">
      <Switch
        checked={this.state.checked}
        onChange={this.handleChange}
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="react-switch"
        id="material-switch"
      />
    </label>
    </>
  );
          }
};
  
export default Visualize;