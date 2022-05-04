import React, { useState, useEffect} from 'react'
import "./HomePage.css"
import ApiRequest from '../../api/ApiRequest'
import Navbar from '../Navbar/Navbar'
import moment from 'moment'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useDispatch, useSelector} from 'react-redux'
import {addCity, removeCity} from '../../store/likes/likes'

const HomePage = () => {
    
    const dispatch = useDispatch()
    
    const selected = useSelector(state => state.selectedCities)
    const likedCities = useSelector (state => state.likedCities)
    
    const [search, setSearch] = useState('')

    const [requestFailed, setRequestFailed] = useState(false)
   
    const [hasLoadedDefault, setHasLoadedDefault] = useState(false)
    
    const [city, setCity] = useState('')

    const [text, setText] = useState('')
    
    const [temp, setTemp] = useState('')
    
    const [fiveDayForecast, setFiveDayForecast] = useState('')
    
    const handleLike = event => {
      event.preventDefault();
      dispatch(addCity(city))
      return 
    };

    const handleRemove = event => {
        event.preventDefault();
        dispatch(removeCity(city))
        return 
      };
    
    const handleChange = event => setSearch(event.target.value)
    
    const handleSearch = async (search = 'Tel Aviv') => {
       
        const data = await ApiRequest.fetchWeatherInfo(search)
        
        if(typeof data === 'string'){
            setRequestFailed(true)
            return
        }
        setRequestFailed(false)
        
        setCity(data.cityName)
        
        setTemp(data.currentWeather.data[0].Temperature.Imperial.Value)

        setText(data.currentWeather.data[0].WeatherText)
        
        setFiveDayForecast(data.fiveDayForecast.data.DailyForecasts)
        return data
    }

    useEffect(() => {
        if(!hasLoadedDefault){
            handleSearch(selected[0])
            setHasLoadedDefault(true)
        } 
    },[]) 
    
    //functions to return UI elements
    const searchField = () => (
        <div className="text-field"> 
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleChange} />
            <Button variant="outlined" 
                onClick={ (event) => { event.preventDefault(); handleSearch(search) }}> 
                search 
            </Button>
        </div>
    )

    const displayError = () => (
        <div>error baby</div>
    )

    const weatherDisplayHeader = () => { 
        return ( 
            <div className="header">
                <div className="header-left">
                    <span className="text">{city} : {temp} F </span>
                </div>
                { likedCities.indexOf(city) < 0 ?  
                    <div className="header-right">
                        <Button variant="text" onClick={handleLike}><FavoriteBorderIcon/></Button>
                    </div> :  
                    
                    <div className="header-right">
                        <Button variant="text" onClick={handleRemove}><FavoriteIcon/></Button>
                    </div> 
                }
            </div>
        )
    }

    const textDisplay = () => (
        <div className='text-display'>
            {text}
        </div>
    )

    const weatherDisplayBody = () => {
        return (
            <div className='weather-display-grid'>
                { fiveDayForecast.length  ? fiveDayForecast.map((element) => {
                    return ( 
                        <div className="card" key={element.Date}>
                            <span className="first">{element.Temperature.Maximum.Value} F </span>
                            <span className="second">{moment(element.Date).format('dddd')}</span> 
                        </div>
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
            {!requestFailed ?   
                <div className='weather-display-wrapper'>
                    {weatherDisplayHeader()}
                    {textDisplay()}
                    {weatherDisplayBody()}
                </div> :
                displayError()}
        </div>
    </>
   )
}

export default HomePage