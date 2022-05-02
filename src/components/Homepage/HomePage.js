import React, {useEffect, useState} from 'react';
import "./HomePage.css"
import ApiRequest from '../../api/ApiRequest'
import Navbar from '../Navbar/Navbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [city, setCity] = useState('')
    const [temp, setTemp] = useState('')
    const [weatherData, setWeatherData] = useState({})
    const key = process.env.REACT_APP_API_KEY
    
    const handleChange = event => (setSearch(event.target.value));
    const handleSearch = async (event) => {
        event.preventDefault()
        const data = await ApiRequest.fetchWeatherInfo(search, key)
        setWeatherData(data)
        setCity(search)
    }

    useEffect(()=>{
        if(Object.entries(weatherData).length === 0){
            console.log('hello')

        } else{
            console.log(weatherData.currentWeather.data[0].Temperature.Metric.Value)
            setTemp(weatherData.currentWeather.data[0].Temperature.Metric.Value)
        }
    },[weatherData])

    return (
    <> 
        <Navbar/>
        <div className="wrapper">
            <div className="text-field"> 
                <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleChange} />
                <Button variant="outlined" onClick={handleSearch}>search</Button>
            </div>

            <div className="weather-display-wrapper">
                <div className="header">
                   <div className="header-left">
                       <span className="image">Image</span>
                       <span className="text">{city} {temp}</span>
                    </div>
                   
                    <div className="header-right">
                       <Button variant="text"><FavoriteIcon/></Button>
                       <span>Add to favorites</span>
                    </div>
                </div>
            </div>
        
        </div>
    </>
   )
}

export default HomePage