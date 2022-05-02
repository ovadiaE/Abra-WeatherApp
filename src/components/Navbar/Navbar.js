import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'


const Navbar = () => {
    return (
        <div className='nav-wrapper'>
            <div> Welcome to Abra Weather App</div>
            <nav>
                <Link to="/Homepage">HomePage</Link> | {" "} 
                <Link to="/Favorites">Favorites</Link>
            </nav>
        </div>
    )
}
export default Navbar