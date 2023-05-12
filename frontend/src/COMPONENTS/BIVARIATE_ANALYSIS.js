import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Select, { components } from 'react-select';
import Chart from 'react-apexcharts'
import './BIVARIATE.css'

let temp;
export default function VISUALIZE_BIVARITE(props) {

    const [dataa,setdataa]=useState();
    const [select1_col,setselect1_col]=useState();
    const [select2_col,setselect2_col]=useState();
    const [column_1,setcolumn_1]=useState('Displacement(in cc)');
    const [column_2,setcolumn_2]=useState('Ex-Showroom_Price(in Rs)');
    const [plot_type,setplot_type]=useState();
    const [bar_data,setbar_data]=useState()
    const [bar_label,setbar_label]=useState()

useEffect(()=>{
  handleChange('scatter')
  visualize('Displacement(in cc)','Ex-Showroom_Price(in Rs)')
},[])
    const col_1=[
      {value:'Make',label:'Make'},
      {value:'Model',label:'Model'},
      {value:'Body_Type',label:'Body_Type'},
      {value:'Type',label:'Type'},
      {value:'Fuel_Type',label:'Fuel_Type'},
      {value:'Drivetrain',label:'Drivetrain'},
    ]
    const col_2=[
      {value:'Displacement(in cc)',label:'Displacement(in cc)'},
      {value:'Ex-Showroom_Price(in Rs)',label:'Ex-Showroom_Price(in Rs)'},
      {value:'City_Mileage(in km/litre)',label:'City_Mileage(in km/litre)'},
      {value:'Kerb_Weight(in kg)',label:'Kerb_Weight(in kg)'},
      {value:'Fuel_Tank_Capacity(in litres)',label:'Fuel_Tank_Capacity(in litres)'},
      {value:'Height(in mm)',label:'Height(in mm)'},
      {value:'Length(in mm)',label:'Length(in mm)'},
      {value:'Width(in mm)',label:'Width(in mm)'},
      {value:'Power(in PS)',label:'Power(in PS)'},
      {value:'Torque(in Nm)',label:'Torque(in Nm)'},
      {value:'Wheelbase(in mm)',label:'Wheelbase(in mm)'},
]

    const handleChange=(value)=>{
      setplot_type(value);
      if(value==='scatter')
      {setselect1_col(col_2)
        setselect2_col(col_2)}
      else{setselect1_col(col_1)
        setselect2_col(col_2)}
      }

const visualize=async(column_1,column_2)=>{
       const send={column_1,column_2}
       try {
       const res=await axios.post('https://automobile-data-analysis.herokuapp.com//fetch_bivarite',send)
       temp=res.data 
          setdataa(temp[0])
          setbar_label(JSON.parse(temp[1]))
          setbar_data(JSON.parse(temp[2]))
       } catch (err) {
           console.error(err);
       } 
}
const handleChange_column_1=(e)=>{
  setcolumn_1(e.value)
  visualize(e.value,column_2);
  }
  const handleChange_column_2=(e)=>{
     setcolumn_2(e.value)
     visualize(column_1,e.value);
    }

const series= [
    {
      type: plot_type,
      data: dataa
    }
  ]
  const options= {
    chart: {
      type: plot_type,
      height: 350,
    },
    title: {
      text: plot_type,
      align: 'left'
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: '#5C4742',
          lower: '#A5978B'
        }
      }
    }
  };
  const scatter_series= [{
    name: "Power",
    data: dataa
  }];

  const scatter_options= {
    chart: {
      height: 350,
      type: 'scatter',
      zoom: {
        enabled: true,
        type: 'xy'
      }
    },
    xaxis: {
      tickAmount: 10,
      title: {
        text:column_1,
      },
    axisBorder: {
        show: true,
        color: '#78909C',
        height: 2,
        width:'100%',
        offsetX: 0,
        offsetY: 2
    },
      labels: {
        formatter: function(val) {
          return parseFloat(val).toFixed(1)
        }
      }
    },
    yaxis: {
      title: {
        text:column_2,
      },
    axisBorder: {
        show: true,
        color: '#78909C',
        height: '100%',
        width: 2,
        offsetX: -5,
        offsetY: 0
    },
      tickAmount: 10
    }
  };

  const bar_series=[{
    name: column_2,
    data: bar_data
  }];

  var bar_options = {
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '100%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['transparent']
  },
  xaxis: {
    categories:bar_label,
    tickAmount: 10,
    title: {
      text:column_1,
    },
  axisBorder: {
      show: true,
      color: '#78909C',
      height: 2,
      width:'100%',
      offsetX: 0,
      offsetY: 2
  },
    labels: {
      formatter: function(val) {
        return parseFloat(val).toFixed(1)
      }
    }
  },
  yaxis: {
    tickAmount: 10,
    title: {
      text:column_2,
    },
  axisBorder: {
      show: true,
      color: '#78909C',
      height: '100%',
      width: 2,
      offsetX: -5,
      offsetY: 0
  },
  },
  fill: {
    opacity: 5
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val 
      }
    }
  }}

    return(
      <div>
          <div className='bivariate_head'><h2>BIVARIATE ANALYSIS</h2></div>
          <div className='bivariate-button' >
            <button className='bivariate-boxplot-button'  onClick={()=>{handleChange('scatter')}}>Scatter</button>
            <button className='bivariate-scatter-button' onClick={()=>{handleChange('bar')}}>Bar</button>
          </div>
          <div className='select_component'>
          <div className='bivariate_select_1'><Select defaultValue={{ label: "Displacement(in cc)", value:'Displacement(in cc)' }} options={select1_col} onChange={handleChange_column_1} /></div>
          <div className='bivariate_select_1'><Select defaultValue={{ label: "Ex-Showroom_Price(in Rs)", value:'Ex-Showroom_Price(in Rs)' }} options={select2_col} onChange={handleChange_column_2} /></div>
           {/* <div className='bivariate_select_2'><Select options={type_col} onChange={handleChange} /></div>  */}
                </div>
            <div style={{ maxWidth: "700px" ,height: "350px",padding:"10px"} }>

           {plot_type==='scatter' ? (
            <Chart options={scatter_options} series={scatter_series} type="scatter" height={350} width={650}/>
              ) : ( <p></p> )}
            {plot_type==='bar' ? (
              <Chart options={bar_options} series={bar_series} type="bar" height={350} width={650}/>
              ) : ( <p></p> )}
      </div>
      <div className='finding'>
      <h3>Inference</h3>
      ➼ It shows how {column_1} varies with the value of {column_2}.</div>
        </div>
    )
}