import React, { useState} from 'react'
import "./HomePage.css"
import ApiRequest from '../../api/ApiRequest'
import Navbar from '../Navbar/Navbar'
import moment from 'moment'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch } from 'react-redux';
import {addCity} from '../../store/likes/likes'


const HomePage = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [city, setCity] = useState('Tel Aviv')
    const [temp, setTemp] = useState('')
    const [fiveDayForecast, setFiveDayForecast] = useState('')
    const [weatherData, setWeatherData] = useState({})
    const key = process.env.REACT_APP_API_KEY

    const handleLike = event => {
      event.preventDefault();
      dispatch(addCity(city))

    };
    
    const handleChange = event => (setSearch(event.target.value))
    const handleSearch = async (event) => {
        event.preventDefault()
        const data = await ApiRequest.fetchWeatherInfo(search, key)
        setWeatherData(data)
        setCity(search)
        setTemp(data.currentWeather.data[0].Temperature.Metric.Value)
        setFiveDayForecast(data.fiveDayForecast.data.DailyForecasts)
    }
    
    //Functions returning the UI elements

    const searchField = () => (
        <div className="text-field"> 
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleChange} />
            <Button variant="outlined" onClick={handleSearch}>search</Button>
        </div>
    )

    const weatherDisplayHeader = () => ( 
            <div className="header">
                <div className="header-left">
                    <span className="image">Image</span>
                    <span className="text">{city} {temp}</span>
                </div>
            
                <div className="header-right">
                    <Button variant="text" onClick={handleLike}><FavoriteIcon/></Button>
                    <span>Add to favorites</span>
                </div>
            </div>
    )

    const weatherDisplayBody = () => {
        return (
            <div className='weather-display-grid'>
                { fiveDayForecast.length === 5 ? fiveDayForecast.map((element) => {
                    return ( 
                        <Card key={element.Date}>
                            <CardContent>
                                {element.Temperature.Maximum.Value}
                            </CardContent>
                            <CardContent>
                                {moment(element.Date).format('dddd')}
                            </CardContent>
                        </Card>
                    )
                }): null} 
            </div>
        )
    }
    
    return (
    <> 
        <Navbar/>
        <div className="homepage-wrapper">
            {searchField()}
            <div className='weather-display-wrapper'>
                {weatherDisplayHeader()}
                {weatherDisplayBody()}
            </div>
        </div>
    </>
   )
}

export default HomePage