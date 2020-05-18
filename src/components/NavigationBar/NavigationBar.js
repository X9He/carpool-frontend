import React from 'react';
import { NavLink } from 'react-router-dom'
import './NavigationBar.scss';


const NavigationBar = ()  => {
    return (
        <div className="navbar">
            <div className="name"><b>Carpool Frontend</b></div>
            <div className="nav-items-container">
                <NavLink className="navbar-item" activeClassName="active" to="/addtrip">Add Trip</NavLink>
                <NavLink className="navbar-item" activeClassName="active" to="/currenttrip">Current Trip</NavLink>
                <NavLink className="navbar-item" activeClassName="active" to="/triptimeline">Trip Timeline</NavLink>
                <NavLink className="navbar-item" activeClassName="active" to="/cars">Cars</NavLink>
                <NavLink className="navbar-item" activeClassName="active" to="/account">My Profile</NavLink>
            </div>
        </div>
    )
};

export default NavigationBar;
