import React,{useEffect} from 'react';
import LoadingScreen from './LoadingScreen/LoadingScreen'
import WeatherScreen from './WeatherScreen/WeatherScreen'
import {connect} from 'react-redux';
import {fetchWeather} from './redux/actions/actions'
import './App.css';

function App({fetchWeather,loading}) {


  useEffect(() => {
      fetchWeather()
  },[])


  return (
    <div className="App">
    {loading ? <LoadingScreen/> : <WeatherScreen />}
    </div>
  );
}

const mapStateToProps =state=>{

  return {
      loading:state.loading
  }

}

const mapDispatchToProps = dispatch=>{
  return {
    fetchWeather:()=>dispatch(fetchWeather())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
