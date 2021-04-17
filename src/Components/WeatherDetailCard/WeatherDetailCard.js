import React from "react";
import { Paper } from '@material-ui/core'

import "./WeatherDetailCard.css"

import {showBarChart} from '../../redux/actions/actions'
import {connect} from 'react-redux';
import { bindActionCreators } from "redux"


const WeatherDetailCard = (props)=>{


    return (
    
    <Paper elevation={3} className="weather-card" onClick={()=>{props.showBarChart(props.id)}}> 

       <h3>Temp:</h3>{props.temp}
       <h3>Date:</h3>{props.date}
        

    </Paper>
    
    )
}



const mapDispatchToProps = dispatch=>{
    return(bindActionCreators( {
        showBarChart:id=>showBarChart(id)
        },dispatch))
  }
  


export default connect(null,mapDispatchToProps)(WeatherDetailCard);