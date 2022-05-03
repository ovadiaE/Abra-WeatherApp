import React, { useState, useEffect} from 'react'
import "./HomePage.css"
import ApiRequest from '../../api/ApiRequest'
import Navbar from '../Navbar/Navbar'
import moment from 'moment'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector} from 'react-redux';
import {addCity} from '../../store/likes/likes'

const HomePage = () => {
    
    const dispatch = useDispatch()
    
    const selected = useSelector(state => state.likedCities)
    
    const [search, setSearch] = useState('')
    
    const [city, setCity] = useState('')
    
    const [temp, setTemp] = useState('')
    
    const [fiveDayForecast, setFiveDayForecast] = useState('')
    
    const [hasLoadedDefault, setHasLoadedDefault] = useState(false)
    
    const handleLike = event => {
      event.preventDefault();
      dispatch(addCity(city))
      return 
    };
    
    const handleChange = event => setSearch(event.target.value)
    
    const handleSearch = async (search = 'Tel Aviv') => {
       
        const data = await ApiRequest.fetchWeatherInfo(search)
        
        setCity(data.cityName)
        
        setTemp(data.currentWeather.data[0].Temperature.Imperial.Value)
        
        setFiveDayForecast(data.fiveDayForecast.data.DailyForecasts)

        return data
    }

    useEffect(() => {
        if(!hasLoadedDefault){
            
            handleSearch(selected[0])
            
            setHasLoadedDefault(true)
            return
        } 
    },[])
    
    //functions to return UI elements
    const searchField = () => (
        <div className="text-field"> 
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleChange} />
            <Button variant="outlined" onClick={ (event) => { event.preventDefault(); handleSearch(search) }}>search</Button>
        </div>
    )

    const weatherDisplayHeader = () => ( 
            <div className="header">
                <div className="header-left">
                    <span className="image">{Image}</span>
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
                }) : null } 
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