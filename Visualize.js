import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import axios from 'axios';
import { variables } from './Variables';
import Switch from 'react-switch';
import './Visualize.css';
import datavisualization from './datavisualization.jpg';
import Card from '@material-ui/core/Card';
import Chart from 'react-apexcharts'

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
      isCategorical:true,
      isBox:false,
      coordinates:[],
      differential:'',
      series: [
        {
          type: 'boxPlot',
          data: [
            {
              x: 'Jan 2015',
              y: [4098, 7000, 7919, 9000 , 10207]
            }        
          ]
        }
      ],
      options: {
        chart: {
          type: 'boxPlot',
          height: 350,
        },
        title: {
          text: 'Basic BoxPlot Chart',
          align: 'left'
        },
        plotOptions: {
          bar: {
            horizontal:true
          },
          boxPlot: {
            colors: {
              upper: '#BD4A4A',
              lower: '#4C7AC2'
            }
          }
        }
      }
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
setNumericalData(){
  const result=[];
  //console.log(this.state.coordinates.x_num)
  
  if(typeof this.state.coordinates.x_num != 'undefined')
    {
      //console.log(this.state.coordinates)
      for (let i = 0; i < this.state.coordinates.x_num.length; i++) {
        //console.log(this.state.coordinates.x.length)
          result.push({x:this.state.coordinates.x_num[i],y:(this.state.coordinates.y_num[i])})
        }
    }
    //console.log(result)
  return result;
}
setDataBoxplot(){
  const result=[];
  //console.log(this.state.coordinates)
  
  if(typeof this.state.coordinates.y_num != 'undefined')
    {
      //console.log(this.state.coordinates)
      for (let i = 0; i < 10; i++) {
        //console.log(this.state.coordinates.x.length)
          result.push(this.state.coordinates.y_num[i])
        }
    }
    //console.log(result)
    return result;
}
setDatapointsPie(){

  const result=[];
  //console.log(this.state.coordinates)
  
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
  var text=[];
  var arrow="";
  var diff = 0
  if(typeof this.state.coordinates.x != 'undefined')
  {
    for (let i = 0; i < this.state.coordinates.x.length; i++) {
      text.push(<div className='display'>{this.state.coordinates.x_labels[i]+":" + this.state.coordinates.y[i]}</div>)
    }
    // text = this.state.coordinates.map((xlabel) => <div>{xlabel}</div>)
  }
  //console.log(text)
 //console.log(typeof text)
  return text

}
  render(){
  const myStyle = { backgroundImage: `url(${datavisualization})`, border:"0", height:"20vh", width:"100%", top:0};
  //const [selected, setSelected] = React.useState("");
  const dataPoints=this.setDatapoints();
  const dataPointsPie = this.setDatapointsPie();
  const numericData = this.setNumericalData();
  const y_boxplot = this.setDataBoxplot();
  const display = this.handleDisplay();
  //console.log(y_boxplot)
   const getattributevalue=(event)=>{

    if(event.target.value == 'Box plot')
    {
      this.setState({isBox:true})
    }
    else{
      this.setState({isBox:false})
    }
    this.setState({
      type: event.target.value
  });
 
   }
  const changeSelectOptionHandler = (event) => {
    this.setState({
      selected: event.target.value
  });
  if(event.target.value=== "Patient Age"||
  event.target.value=== "Blood cell count (mcL)"||
  event.target.value==="White Blood cell count (thousand per microliter)"||
  event.target.value==="Mother's age"||
  event.target.value==="No. of previous abortion)")  {
    if(this.state.type === 'Bar graph')
    this.setState({ type: "Box plot"});
    this.setState({isBox: true})
  }
  else{
    if(this.state.type === 'Box plot')
    {
      this.setState({ type: "Bar graph"});
      this.setState({isBox: false})
    }
  }
    axios.post(variables.API_URL+'visualize', { selected: event.target.value,dpcheck: this.state.checked })
    .then(response => this.setState({ coordinates: response.data }));
    
    this.setState({displayChart: true})
 
  };
  
  /** Different arrays for different dropdowns */
  const categorical = [
    
    "Bar  graph",
    "Pie chart"
  ];
  const numerical = [ "Box plot","Scatter plot","Histogram"];
  
  
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
  this.state.selected=== "Blood cell count (mcL)"||
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
      toolTipContent: "<b>{label}</b>: {y}",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}",
      dataPoints: dataPointsPie
    }]
  }

  const options_scatter = {
    theme: "light1",
    animationEnabled: true,
    exportEnabled: true,
    zoomEnabled: true,
    title:{
      text: "Data visualization:"+this.state.selected
    },
    axisX: {
      title:"Data points",
      // crosshair: {
      //   enabled: true,
      //   snapToDataPoint: true
      // }
    },
    axisY:{
      title: this.state.selected,
      // crosshair: {
      //   enabled: true,
      //   snapToDataPoint: true
      // }
    },
    data: [{
      type: "scatter",
      markerSize: 15,
      toolTipContent: "Data Point: {x} Sales: {y}",
      dataPoints: numericData
    }]
  }
  
  const options_box = {
    theme: "light1",
    animationEnabled: true,
    exportEnabled: true,
    zoomEnabled: true,
    title:{
      text: this.state.selected
    },
    axisY: {
      title: this.state.selected
    },
    data: [{
      type: "boxAndWhisker",
      dataPoints: [
        { //label: this.state.selected,  y: [9.857562482195815, 7.472701665115447, 7.919320981493317, 4.098210272243849, 10.27223038958957, 6.825974323855865, 9.836351500269854, 6.669552178444405, 6.397701725889903, 5.957320885489781] }]
          label: "Bread",  y: [4098, 7000, 7919, 9000 , 10207] }]
    }]
  }

  const box_apex = {
    
  }
  

  var chartType = options_bar;
  //console.log(this.state.type)
  if(this.state.type == 'Bar graph')
  {
    chartType = options_bar
  }
  else if(this.state.type == 'Pie chart'){
    chartType = options_pie
  }
  else if(this.state.type == 'Scatter plot'){
    chartType = options_scatter
  }
  else if(this.state.type == 'Box plot'){
    chartType = options_box
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
        // margin: "16px",
        marginLeft:"400px",
      }}
    >
      <form class="form">
        <div class="attribute">
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
            <option>Blood cell count (mcL)</option>
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
    {!this.state.checked && <label>Without Differential Privacy</label>}
    {this.state.checked && <label>Differential Privacy</label>}
      </div>
    <div className='displayText'>
    <Card style={{
         
         boxShadow: "0 5px 8px 0",
         backgroundColor:'lightcyan',
       }}>

    {/* {display} */}

    </Card>
    
    </div>
    {this.state.isBox && <div className='boxPlot'>
    <Card style={{
							width:"98%",
							boxShadow: "0 5px 8px 0",
						}}>
    <Chart options={this.state.options} series={this.state.series} type="boxPlot" height={350} />
    </Card>
    </div>}
    </>
  );
          }
};
  
export default Visualize;