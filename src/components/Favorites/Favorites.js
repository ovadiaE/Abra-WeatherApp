import React, {useEffect, useState} from 'react';
import ApiRequest from '../../api/ApiRequest'
import Navbar from '../Navbar/Navbar';
import './Favorites.css'
import {useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {selectCity} from '../../store/likes/likes'

function Favorites () {
  
  const dispatch = useDispatch()
  
  const [data, setData] = useState([])
  
  const likes = useSelector(state => state.likedCities)
  
  const getLikedCitiesWeather = async (likes) => {
    const weather = await ApiRequest.fetchLikedCities(likes)
    
    setData(weather)
    return data
  };
  
  useEffect(() => {
      if(likes.length) {
        getLikedCitiesWeather(likes)
  }},[])

  const weatherDisplayBody = () => {
    return (
    <nav  className='wrapper'>
      { data.length  ? data.map((element) => {
        return ( 
          <Card key={element.city} onClick = {(event) => {event.preventDefault(); dispatch(selectCity(element.city))}}>
            <Link to="/Homepage">
              
              <CardContent>
                {element.city}
              </CardContent>
              
              <CardContent>
                {element.text}
              </CardContent>
              
              <CardContent>
                {element.temp}
              </CardContent>
            
            </Link>
          </Card> ) }): null} 
      </nav>
      )
  }

  return (
    <> 
      <Navbar/>
      {weatherDisplayBody()}
    </>
  )
}

export default Favorites;