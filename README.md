# Weather App made using React,Redux,Material UI and OpenWeatherAPI

Preview avalible at https://safithetechi.github.io/weather-app/


## Application Architecture
 
 The Initail State of the Application 
 
 ```javascript 
const InitState = {
    loading:false,
    error:'',
    list: [],
    unit : CELSIUS,
    barChartId:null    
} 
```

* The <b>loading</b> property determines the transition from Loading Screen Component to Weather Screen Component
* The <b>list</b> holds the main.temp and timestamp that is received from OpenWeatherAPI call
* The <b>error</b> property holds the error message while retriving data from the API
* The <b>unit</b> property determines what is the current Unit of temprature the entire application is using
* The <b>barChartId</b> property is assigned when a card is clicked this id corresponds with the date on the card which the selector function (selectWeatherDataForBarChart) uses to get the time span for the right day


### How the Application determines what Unit to use i.e Fahrenheit to Celsius ?

When Ever the toggel button is pressed it fires off this action

 ```javascript 

const changeUnit = unit=>{
    return {
        type:UNIT,
        payload:unit
    }
}

```

The Temprature values recived from OpenWeather is in Kalvin so the following function converts it to the requested unit and then the returned value is rendered

 ```javascript 

const UnitConversion = (unit, kal)=>{

        if(unit === CELSIUS) return parseFloat(Kal2Cel(kal)).toFixed(2);

        if(unit === FAHREN) return parseFloat(Kal2Fer(kal)).toFixed(2);

}
```

Conversion from Kalvin to Celsius
```javascript 

const Kal2Cel = (Kal)=>{
    return Kal -273.15
}
```

Conversion from Kalvin to Fahrenheit

```javascript 

const Kal2Fer = (Kal)=>{
    return ((Kal -273.15)*1.8) + 32
}
```

### How the Application Fetches and stores the data ?


These actions are called depending on the state the API request is in i.e in progress , is a success or has failed


```javascript 

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
```


This function thanks to the redux-thunk middleware makes the request to the API and on success gets the tempratures and timestamps from the response and assigns it to the <b>list</b> property 

```javascript 

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
```


### How the Application renders the cards and the chart?




## Further imporvements Required

Other Feature that can be added can be to get location data of the current user and to make sure that our API Key is secure we can use the something like dot-env package to hide it from people that might want to steal it


Other than making the design responsive and adding unit tests, The following code can be memoized to save time for loading. This  function transforms the data so the selector functions for the Cards and the BarChart can render it accordingly. Hence if this is cached it will save time for loading. Also this function can be refactored to not have so many lines of code
 
 
 ```javascript
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
        weatherDataArray.push(weatherData[index])
        weatherObj[currentDate] = weatherDataArray
        currentDate2 = currentDate
       }

  }

  console.log(weatherObj)


  return weatherObj;

} 
```
    


