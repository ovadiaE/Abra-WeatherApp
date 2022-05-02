import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ApiRequest from '../../api/ApiRequest'
import "./SearchBar.css"



const SearchBar = () => {
    const [search, setSearch] = useState('')
    const key = process.env.REACT_APP_API_KEY
    const handleChange = event => (setSearch(event.target.value));



    const handleSearch = async (event) => {
        event.preventDefault()
        const data = await ApiRequest.fetchWeatherInfo(search, key)
        console.log(data)
    }
    
    return (
        <div className="text-field"> 
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleChange} />
            <Button variant="outlined" onClick={handleSearch}>search</Button>
        </div>
   )
}

export default SearchBar