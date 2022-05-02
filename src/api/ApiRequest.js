import axios from "axios";

const key = process.env.REACT_APP_API_KEY;
// console.log(key)

export default class ApiRequest {

  static async fetchWeatherInfo(city, key) {
    try {
      const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`)
      const data = await response
   
            
      const locationKey = data.data[0].Key
            
      const fiveDayForecast = await fetchFiveDayForecast(locationKey, key)
      const currentWeather = await fetchCurrentWeather(locationKey, key)
      
      const allData = {currentWeather: currentWeather, fiveDayForecast: fiveDayForecast}
     
      return allData
        
    } 
    catch (error) {
      console.log(error)
    }
 }
}
  
async function fetchFiveDayForecast (locationKey, key) {
    try {
      const response = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${key}`)
      const data = await response
      
      return data
    } 
    catch (error) {
      console.log(error)
    }
  }

  async function fetchCurrentWeather (locationKey, key){
    try {
      const response = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key}`)
      const data = await response
      return data
  
    } 
    catch (error) {
      console.log(error)
    }
  }
  