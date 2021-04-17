import React from "react";
import TempratureUnitToggle from '../Components/TempratureUnitToggle/TempratureUnitToggle'
import WeatherDetailCarousel from "../Components/WeatherDetailsCarousel/WeatherDetailsCarousel"
import Chart from "../Components/BarChart/BarChart"

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      position:"relative"
    },
  }))



const WeatherScreen = ()=>{
    const classes = useStyles();


    return (
        <div className={classes}>


            <TempratureUnitToggle />


            <WeatherDetailCarousel />

            <Chart/>
        
        </div>
    )



}

export default WeatherScreen;