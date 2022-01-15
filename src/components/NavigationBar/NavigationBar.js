import React from 'react';
import { NavLink } from 'react-router-dom'
import './NavigationBar.scss';


import {withCookies} from "react-cookie";
import {loginSuccess} from "../../redux/User/user.actions";
import {connect} from "react-redux";


const NavigationBar = (props)  => {
    return (
        <div className="navbar">
            <NavLink className="name" to="/"><b>Carpool Planner</b></NavLink>
            {props.token?
                <div className="nav-items-container">
                    <NavLink className="navbar-item" activeClassName="active" to="/addtrip">Add Trip</NavLink>
                    <NavLink className="navbar-item" activeClassName="active" to="/currenttrip">Current Trip</NavLink>
                    <NavLink className="navbar-item" activeClassName="active" to="/triptimeline">Trip Timeline</NavLink>
                    <NavLink className="navbar-item" activeClassName="active" to="/cars">Cars</NavLink>
                    <div className='option' onClick={() => {
                        logout(props)
                    }}>Sign Out</div>
                </div>
                :null
                }


        </div>
    )};


const logout = (props) => {
    props.loginSuccess("");
    props.cookies.set("token", "");
}



const mapStateToProps = state => ({
    token: state.user.token
});

const mapDispatchToProps = dispatch => ({
    loginSuccess: token => dispatch(loginSuccess(token))
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(NavigationBar));

