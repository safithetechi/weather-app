import {
    FETCH_WEATHER_REQUESTED,
    FETCH_WEATHER_FAILED,
    FETCH_WEATHER_SUCESS,
    CELSIUS,
    UNIT,
    SHOW_BAR_CHART
} from '../actions/actionTypes'

import {TimeStampToUTCDate,TimeStampToUTCString,TimeStampToUTCTimeString,UnitConversion} from '../../Utils/Utils' 


const InitState = {
    loading:false,
    error:'',
    list: [],
    unit : CELSIUS,
    barChartId:null    
} 
  
  

const reducer = (state = InitState,action)=>{
      switch(action.type){
          case FETCH_WEATHER_REQUESTED: return {
            ...state,
            loading:true
          }
          case FETCH_WEATHER_FAILED: return {
            ...state,
            error:action.payload
          }
          case FETCH_WEATHER_SUCESS: return {
            ...state,
            list:action.payload,
            loading:false
          }
          case UNIT:return {
              ...state,
              unit:action.payload
          }
          case SHOW_BAR_CHART: return {
            ...state,
            barChartId:action.payload
          }
          default: return {
              ...state
          }
      }

}

const selectTempratureForDay = state=>{

  const weatherData = state.list  

  let weatherObj={}
  let weatherDataArray =[]
  let currentDate=0;
  let currentDate2=0;

  let index=0;
  for(index=0;index<weatherData.length;index++){

    currentDate = TimeStampToUTCDate(weatherData[index].date);
      if(currentDate2 === 0 ){
        currentDate2 = currentDate
      }

      if(currentDate === currentDate2){
        weatherDataArray.push(weatherData[index])
        weatherObj[currentDate] = weatherDataArray
       }
       else {
        weatherDataArray = []
        currentDate2 = currentDate
       }

  }

  return weatherObj;

} 


export const selectAverageTempForEachDay = state=>{
  const weatherObj = selectTempratureForDay(state)
  console.log(weatherObj)
  let key =0;
  let dataArray = []
  let data = {id:0,date:'',averageTemp:0}


  for(key in weatherObj){

      data.id = key;
      data.date = TimeStampToUTCString(weatherObj[key][0].date)
      data.averageTemp = weatherObj[key].reduce((a, b) => a + b.temp, 0)/weatherObj[key].length
      
      dataArray.push(data)
      data= {}
  }
  
  return dataArray

}


export const selectWeatherDataForBarChart = state=>{
  const weatherObj = selectTempratureForDay(state)

  if(state.barChartId === null) return []

 const labels =  weatherObj[state.barChartId].map(data=>
    TimeStampToUTCTimeString(data.date)
  )

  const values = weatherObj[state.barChartId].map(data=>
    UnitConversion(state.unit,data.temp)
  )

  return [labels,values]

}


export default reducer;