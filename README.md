# Weather App made using React and Material UI

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






## Further imporvements Required

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
    
Other Feature that can be added can be to get location data of the current user and to make sure that our API Key is secure we can use the something like dot-env package to hide it from people that might want to steal it


