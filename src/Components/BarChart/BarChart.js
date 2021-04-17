import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import { Bar as BarChart } from 'react-chartjs-2';


import {connect} from 'react-redux';

import {selectWeatherDataForBarChart} from '../../redux/reducer/reducer'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import "./BarChart.css"

const Chart = ({weatherData})=>{


  const [labels,data] = weatherData

  let chartData = {
    labels: labels,
    datasets: [{
      label: "Weather Data Chart",
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      data: data,
    }]
  };
  let chartOptions = {
 
    maintainAspectRatio : true
 
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('xs'));


    console.log(matches)

    return (
      <Paper id="">
                <BarChart data={chartData} options={chartOptions}  width={100}
  height={25} />

    </Paper>


    )



}


const mapStateToProps =state=>{

  return {
      weatherData:selectWeatherDataForBarChart(state),

  }

}



export default connect(mapStateToProps)(Chart);