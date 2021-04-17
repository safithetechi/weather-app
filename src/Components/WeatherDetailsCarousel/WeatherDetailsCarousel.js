import React from "react"
import WeatherDetailCard from "../WeatherDetailCard/WeatherDetailCard"
import Carousel from 'react-elastic-carousel'
import {connect} from 'react-redux';

import {selectAverageTempForEachDay} from '../../redux/reducer/reducer'

import {UnitConversion} from '../../Utils/Utils'


const WeatherDetailCarousel = (props)=>{

    
    return (
        <Carousel className="weather-carousel" itemsToShow={3}>
        {
            props.weatherData.map(data=>{
               return <WeatherDetailCard 
                            temp={UnitConversion(props.unit,data.averageTemp)} 
                            date= {data.date} 
                            key={data.id} 
                            id={data.id}
                            onClick={()=>console.log(data.id)}
                         />
            
            })
        }
        </Carousel>
    )

}

const mapStateToProps =state=>{

    return {
        unit:state.unit,
        weatherData:selectAverageTempForEachDay(state)
    }
  
  }


export default connect(mapStateToProps)(WeatherDetailCarousel);