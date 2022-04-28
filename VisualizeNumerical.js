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

class VisualizeNumerical extends Component {

  constructor(props){
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.state={
      type: 'Scatter plot',
      displayTxt: "",
      displayChart: false,
      checked: false,
      selected:'',
     
      coordinates:[],
      differential:'',
      
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
      for (let i = 0; i < 100; i++) {
        //console.log(this.state.coordinates.x.length)
          result.push(this.state.coordinates.y_num[i])
        }
    }
    console.log(result)
    return result.sort();
}

handleChange(checked) {
  this.setState({ checked });
  //console.log(checked)
  axios.post(variables.API_URL+'visualize',  { selected: this.state.selected,dpcheck: checked, grph_type: this.state.type}).then(response => {
    this.setState({ coordinates: response.data});
    console.log(response.data)
  
}).then(this.chart.render())
  
}

handleDisplay=()=>{
  var text=[];
  
  if(typeof this.state.coordinates.x != 'undefined')
  {
    for (let i = 0; i < this.state.coordinates.x.length; i++) {
      text.push(<div className='display'>{this.state.coordinates.x_labels[i]+":" + this.state.coordinates.y[i]}</div>)
    }
    // text = this.state.coordinates.map((xlabel) => <div>{xlabel}</div>)
  }
  
  return text

}
  render(){
  const myStyle = { backgroundImage: `url(${datavisualization})`, border:"0", height:"20vh", width:"100%", top:0};
  //const [selected, setSelected] = React.useState("");
  const dataPoints=this.setDatapoints();
  
  const numericData = this.setNumericalData();
  //const y_boxplot = this.setDataBoxplot();
  const display = this.handleDisplay();
  //console.log(y_boxplot)
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
    .then(response => this.setState({ coordinates: response.data }));
    
    this.setState({displayChart: true})
 
  };
  
  /** Different arrays for different dropdowns */
  
  const numerical = [ "Scatter plot","Box plot","Histogram"];
  
  
  /** Type variable to store different array for different dropdown */
  
  
  /** This will be used to create set of options that user will see */
  let options = null;
  
  
   
  
  
  /** If "Type" is null or undefined then options will be null,
   * otherwise it will create a options iterable based on our array
   */
  
    options = numerical.map((el) => <option key={el}>{el}</option>);
  
 var label;
  if(typeof this.state.coordinates.x_labels != 'undefined')
  {
    label = this.state.coordinates.x_labels
  }
  //console.log(label)
  
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
       crosshair: {
         enabled: true,
         snapToDataPoint: true
       }
    },
    axisY:{
      title: this.state.selected,
       crosshair: {
         enabled: true,
         snapToDataPoint: true
       }
    },
    data: [{
      type: "scatter",
      markerSize: 15,
      toolTipContent: "Data Point: {x} : {y}",
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

  // const series=[
  //   {
  //     type: 'boxPlot',
  //     data: [
  //       {
  //         x: this.state.selected,
  //         y: y_boxplot
  //       }        
  //     ]
  //   }
  // ]
  

  var chartType = options_scatter;
  
  if(this.state.type == 'Scatter plot'){
    chartType = options_scatter
  }
  else if(this.state.type == 'Box plot'){
    chartType = options_box
  }
  else{
    chartType = options_scatter
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
            <option>Choose genomic attribute</option>
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
    {/* {this.state.isBox && <div className='boxPlot'>
    <Card style={{
							width:"98%",
							boxShadow: "0 5px 8px 0",
						}}>
    <Chart options={this.state.options} series={series} type="boxPlot" height={350} />
    </Card>
    </div>} */}
    </>
  );
          }
};
  
export default VisualizeNumerical;