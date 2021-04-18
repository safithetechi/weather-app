# Weather App made using React and Material UI

Preview avalible at https://safithetechi.github.io/weather-app/


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
    



