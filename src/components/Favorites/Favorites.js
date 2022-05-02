import React, {useState} from 'react';
import Navbar from '../Navbar/Navbar';
import {useSelector } from 'react-redux';


function Favorites () {
  const likes = useSelector(state => state.likedCities)
  const [cities, setCities] = useState([])
  console.log(likes)

  return (
    <> 
    <Navbar/>
    <div className="wrapper">
     {likes.length > 1 ? <h1>{likes[0].name}</h1> : null} 
  </div>
  </>
);
 
}

export default Favorites;
