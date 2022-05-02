import React, {useState} from 'react';
import "./HomePage.css"
import ApiRequest from '../../api/ApiRequest'
import Navbar from '../Navbar/Navbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const HomePage = () => {
    const [search, setSearch] = useState('')
    const key = process.env.REACT_APP_API_KEY
    
    const handleChange = event => (setSearch(event.target.value));
    const handleSearch = async (event) => {
        event.preventDefault()
        const data = await ApiRequest.fetchWeatherInfo(search, key)
        console.log(data)
    }
    
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
                       
                   </div>
                   <div className="header-right">right</div>
                </div>
            </div>
        </div>
    </>
   )
}

export default HomePage