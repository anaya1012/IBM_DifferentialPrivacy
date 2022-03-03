import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import axios from 'axios';
import { variables } from './Variables';
import Switch from 'react-switch';
import './Visualize.css';
import Card from '@material-ui/core/Card';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Visualize extends Component {

  constructor(props){
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.state={
      type: 'Bar graph',
      displayTxt: "",
      displayChart: false,
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
      //console.log(this.state.coordinates)
      for (let i = 0; i < this.state.coordinates.x.length; i++) {
        //console.log(this.state.coordinates.x.length)
          result.push({x:this.state.coordinates.x[i],y:(this.state.coordinates.y[i])})
        }
    }
    //console.log(result)
  return result;
}
setDatapointsPie(){

  const result=[];
  console.log(this.state.coordinates)
  
  if(typeof this.state.coordinates.x != 'undefined')
    {
      //console.log(this.state.coordinates)
      for (let i = 0; i < this.state.coordinates.x.length; i++) {
        //console.log(this.state.coordinates.x.length)
          result.push({y:this.state.coordinates.y[i],label:(this.state.coordinates.x_labels[i])})
        }
    }
    //console.log(result)
  return result;
}
handleChange(checked) {
  this.setState({ checked });
  //console.log(checked)
  axios.post(variables.API_URL+'visualize',  { selected: this.state.selected,dpcheck: checked }).then(response => this.setState({ coordinates: response.data })).then(this.chart.render());
}

handleDisplay=()=>{
  var text="";
  if(typeof this.state.coordinates.x != 'undefined')
  {
    for (let i = 0; i < this.state.coordinates.x.length; i++) {
      text = text.concat(this.state.coordinates.x_labels[i],":",this.state.coordinates.y[i],"\n")
    }
  }
  console.log(text)
  console.log(typeof text)
  return text

}
  render(){
  //const [selected, setSelected] = React.useState("");
  const dataPoints=this.setDatapoints();
  const dataPointsPie = this.setDatapointsPie();
  const display = this.handleDisplay();

  // var display
  // if(typeof this.state.displayTxt != 'undefined')
  // {
  //   display = this.state.displayTxt
  // }
  //console.log(dataPoints)
  //console.log(dataPointsPie)
   const getattributevalue=(event)=>{

    
    this.setState({
      type: event.target.value
  });
 
   }
  const changeSelectOptionHandler = (event) => {
    this.setState({
      selected: event.target.value
  });
    axios.post(variables.API_URL+'visualize', { selected: event.target.value,dpcheck: this.state.checked })
    .then(response => this.setState({ coordinates: response.data }));
    
    this.setState({displayChart: true})
 
  };
  
  /** Different arrays for different dropdowns */
  const categorical = [
    
    "Bar  graph",
    "Pie chart"
  ];
  const numerical = [ "Box plot","Scatter plot","Line graph"];
  
  
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
  var label = ['Yeah, Nah'];
  if(typeof this.state.coordinates.x_labels != 'undefined')
  {
    label = this.state.coordinates.x_labels
  }
  //console.log(label)
  const options_bar = {
    animationEnabled: true,
    exportEnabled: true,
    zoomEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    title:{
      text: "Data visualization:"+this.state.selected
    },
    toolTip:{   
				
      shared: true,
    },
    axisY: {
      title: "Frequency",
      interlacedColor: "Azure",
      tickLength: 10,
      interval:5000
      },
    
      axisX: {
        title: "Categories",
      tickLength: 10,
      interval:1,
      labelFormatter: function(e){
        const	categories = label
        return categories[e.value];
      },
      },
      data: [
      { 
        toolTipContent: "<b>{x}</b>: {y}",       
        dataPoints: dataPoints 
      
      },
      
    
      ]
    
  }
  const options_pie = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Data visualization:"+this.state.selected
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: dataPointsPie
    }]
  }
  var chartType = options_bar;
  if(this.state.type == 'Bar graph')
  {
    chartType = options_bar
  }
  else{
    chartType = options_pie
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
      <form class="form">
        <div class="attribute">
          
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
        <div class="graphselect">
          <select onChange={getattributevalue}>
            {
              /** This is where we have used our options variable */
              options
            }
          </select>
        </div>
      </form>

    </div>
    <div className='chart'>
    <Card style={{
							width:"98%",
							boxShadow: "0 5px 8px 0",
						}}>
     {this.state.displayChart && <CanvasJSChart options = {chartType} 
				 onRef={ref => this.chart = ref} 
				// onRef={this.setState({chartRef:this.chart})}
			/> }
      </Card>
      </div>
      <label htmlFor="material-switch">
      {this.state.displayChart && <Switch
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
      />}
    </label>
    <div className='displayText'>
    <Card style={{
         
							boxShadow: "0 5px 8px 0",
              backgroundColor:'lightcyan',
						}}>
    
    {display}
    
    </Card>
    </div>
    </>
  );
          }
};
  
export default Visualize;