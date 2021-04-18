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
* The <b>barChartId</b> property is assigned when a card is clicked this id corresponds with the date on the card which the selector function (selectWeatherDataForBarChart) uses to get the time span and temprature data for that day


### How does the Application determines what Unit to use i.e Fahrenheit to Celsius ?

When Ever the toggel button is pressed it fires off this action

 ```javascript 

const changeUnit = unit=>{
    return {
        type:UNIT,
        payload:unit
    }
}

```

The Temprature values recived from OpenWeather are in Kalvin so the following function converts it to the requested unit and then the returned value is rendered

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

### How does the Application Fetches and stores the data ?


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
        axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID='APPID'cnt=40')
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


### How does the Application render the cards and the chart?


The Following Helper function take the timestamp as their arguments and return the UTC equivalent

This function returns the date as string 
```javascript 
const TimeStampToUTCString = (timeStamp)=>{

    const date = new Date(timeStamp*1000)
    return date.toUTCString().split(' ').slice(0, 4).join(' ');
}
```
This function returns the Time
```javascript 
const TimeStampToUTCTimeString = (timeStamp)=>{

    const date = new Date(timeStamp*1000)
    return date.toUTCString().split(' ')[4];
}
```

This function returns the numeric date which is used as an identifier
```javascript 
const TimeStampToUTCDate = (timeStamp)=>{

    const date = new Date(timeStamp*1000)
    return date.getUTCDate()
}

```

This function transfroms the list of raw data into a structured object that has the numeric date as an identifer to the time and the temprature at that time
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

Example Output: The key is the date and the array assigned to it is the temprature and time data 

```javascript
  18: Array(6)
0: {temp: 275.6, date: 1618725600}
1: {temp: 275.93, date: 1618736400}
2: {temp: 277.56, date: 1618747200}
3: {temp: 278.43, date: 1618758000}
4: {temp: 276.86, date: 1618768800}
5: {temp: 275.65, date: 1618779600}

19: Array(8)
0: {temp: 274.64, date: 1618790400}
1: {temp: 274.16, date: 1618801200}
2: {temp: 276.72, date: 1618812000}
3: {temp: 279.94, date: 1618822800}
4: {temp: 282.88, date: 1618833600}
5: {temp: 281.92, date: 1618844400}
6: {temp: 278.98, date: 1618855200}
7: {temp: 277.97, date: 1618866000}

20: Array(8)
0: {temp: 277.64, date: 1618876800}
1: {temp: 277.44, date: 1618887600}
2: {temp: 277.99, date: 1618898400}
3: {temp: 281.12, date: 1618909200}
4: {temp: 284.52, date: 1618920000}
5: {temp: 285.71, date: 1618930800}
6: {temp: 280.79, date: 1618941600}
7: {temp: 278.32, date: 1618952400}

21: Array(8)
0: {temp: 277.15, date: 1618963200}
1: {temp: 276.33, date: 1618974000}
2: {temp: 278.68, date: 1618984800}
3: {temp: 284.84, date: 1618995600}
4: {temp: 286.06, date: 1619006400}
5: {temp: 287.3, date: 1619017200}
6: {temp: 281.75, date: 1619028000}
7: {temp: 279.39, date: 1619038800}

22: Array(8)
0: {temp: 278.19, date: 1619049600}
1: {temp: 277.74, date: 1619060400}
2: {temp: 279.33, date: 1619071200}
3: {temp: 280.47, date: 1619082000}
4: {temp: 281.92, date: 1619092800}
5: {temp: 283.07, date: 1619103600}
6: {temp: 279.09, date: 1619114400}
7: {temp: 275.85, date: 1619125200}

23: Array(2)
0: {temp: 274.2, date: 1619136000}
1: {temp: 273.05, date: 1619146800}


```

This data is then used by the following two selector functions 


This function calculates the average and gets the date as a string to render on the cards

```javascript

export const selectAverageTempForEachDay = state=>{
  const weatherObj = selectTempratureForDay(state)
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
```

This function is passed the barChartId i.e selected date and the data is rendered accordingly

```javascript
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
```




## Further imporvements Required

Other Feature that can be added is to get location data of the current user and to make sure that our API Key is secure, we can use  something like dot-env package to hide it from people that might want to steal it


Other than making the design responsive and adding unit tests, The following code can be memoized to improve performance. This  function transforms the data so the selector functions for the Cards and the BarChart can render it accordingly. Hence if this is cached it will only run once and not twice improving performance. Also this function can be refactored to not have so many lines of code
 
 
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
    


