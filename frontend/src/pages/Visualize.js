import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import axios from 'axios';
import { variables } from './Variables';
import Switch from 'react-switch';
import './Visualize.css';
import Card from '@material-ui/core/Card';
import datavisualization from './datavisualization.jpg';

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
      coordinates:[],
      dpCoordinates:[]
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
  axios.post(variables.API_URL+'visualize',  { selected: this.state.selected,dpcheck: checked, grph_type: this.state.type }).then(response => this.setState({ coordinates: response.data })).then(this.chart.render());
}

handleDisplay=()=>{
  var text=[];
  var upArrow=true;
  var diff = 0
  var ans=""
  console.log(this.state.dpCoordinates)
  if(typeof this.state.coordinates.x != 'undefined')
  {
    for (let i = 0; i < this.state.coordinates.x.length; i++) {
      if(this.state.checked===true)
      {
        if(typeof this.state.dpCoordinates.y != 'undefined' )
        {
          console.log("in second if",this.state.dpCoordinates.y)
          console.log(this.state.coordinates.y)
          console.log(this.state.coordinates.y[i])
          console.log(this.state.dpCoordinates.y[i])
          if(this.state.dpCoordinates.y[i]!=this.state.coordinates.y[i])
          {
            ans=""
            diff=0
            console.log("in if")
            console.log(this.state.dpCoordinates.y[i])
            console.log(this.state.coordinates.y[i])
            diff = this.state.dpCoordinates.y[i]-this.state.coordinates.y[i]
            ans = ""
            if(diff<0)
            {
              upArrow = false
              //ans = <AiIcons.AiOutlineArrowUp></AiIcons.AiOutlineArrowUp>
              ans = " +"+Math.abs(diff)
            }
            else{
              upArrow = true
              console.log("in else")
              //ans = <AiIcons.AiOutlineArrowDown></AiIcons.AiOutlineArrowDown>
              ans=" -"+Math.abs(diff)
            }
          }
        }
      }
      text.push(<div className='display'>{this.state.coordinates.x_labels[i]+":" + this.state.coordinates.y[i]+ans}</div>)
    }
    // text = this.state.coordinates.map((xlabel) => <div>{xlabel}</div>)
  }
  //console.log(text)
  //console.log(typeof text)
  return text










  
 

}
  render(){
    const myStyle = { backgroundImage: `url(${datavisualization})`, border:"0", height:"25vh", width:"100%", top:0};
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
    axios.post(variables.API_URL+'visualize', { selected: event.target.value,dpcheck: this.state.checked , grph_type: this.state.type})
    .then(response =>{ this.setState({ coordinates: response.data  })
      this.setState({dpCoordinates: response.data})
      
    });
    
    this.setState({displayChart: true})
 
  };
  
  /** Different arrays for different dropdowns */
  const categorical = [
    
    "Bar  graph",
    "Pie chart"
  ];
  
 
  
  
  
  /** Type variable to store different array for different dropdown */
  let type = null;
  
  /** This will be used to create set of options that user will see */
  let options = null;
  
  
  type=categorical;
  /** If "Type" is null or undefined then options will be null,
   * otherwise it will create a options iterable based on our array
   */
  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
  }
  var label;
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
  
  //console.log(this.state.type)
  if(this.state.type === 'Bar graph')
  {
    chartType = options_bar
  }
  else if(this.state.type === 'Pie chart'){
    chartType = options_pie
  }
  else{
    chartType = options_bar
  }
  return (
    
    <>
    
    <div style = {myStyle}>
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
      <div>
        
      
      <label htmlFor="material-switch">

      {this.state.displayChart &&  <Switch
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
    {!this.state.checked && <label>Without Differential Privacy</label>}
    {this.state.checked && <label>Differential Privacy</label>}
      </div>
    <div className='displayText'>
    <Card style={{
              textAlign:'center',
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