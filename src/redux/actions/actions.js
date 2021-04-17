import {
    FETCH_WEATHER_REQUESTED,
    FETCH_WEATHER_FAILED,
    FETCH_WEATHER_SUCESS,
    CELSIUS,
    FAHREN,
    UNIT,
    SHOW_BAR_CHART
} from './actionTypes'

import axios from 'axios'


const changeUnit = unit=>{
    return {
        type:UNIT,
        payload:unit
    }
}


const fetchWeatherRequested = ()=>{
    return {
        type:FETCH_WEATHER_REQUESTED
    }
}

const fetchWeatherSuccess = data=>{
    return {
        type:FETCH_WEATHER_SUCESS,
        payload:data
    }
}

const fetchWeatherFailed= error=>{
    return {
        type:FETCH_WEATHER_FAILED,
        payload:error
    }
}

const showBarChart= id=>{
    return {
        type:SHOW_BAR_CHART,
        payload:id
    }
}

const fetchWeather = ()=>{
    return function(dispatch){
        dispatch(fetchWeatherRequested())
        axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40')
        .then(response=>{
            
            console.log("Weather Data response",response.data);

            const list= response.data.list.map(data=>({temp:data.main.temp, date:data.dt}))
            dispatch(fetchWeatherSuccess(list))

        })
        .catch(error=>{
            dispatch(fetchWeatherFailed(error.message))
        })
    }
}


export {
    changeUnit,
    fetchWeather,
    showBarChart
}