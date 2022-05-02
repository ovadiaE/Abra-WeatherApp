import React from 'react';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../SearchBar/SearchBar'
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import "./HomePage.css"


const HomePage = () => {
    return (
        <> 
            <Navbar/>
            <div className="wrapper">
                <SearchBar/>
                <WeatherDisplay/>
            </div>
        </>
    )
}
export default HomePage