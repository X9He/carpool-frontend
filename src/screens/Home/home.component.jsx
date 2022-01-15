import React from 'react';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './home.styles.scss';

import {setUserType} from "../../redux/User/user.actions";

const Home = ({setUserType}) => {
    const today = new Date();
    const hour = today.getHours()
    return (
        <div className='homepage'>
            <h1>{hour < 12? 'Good Morning! Please Log In':hour < 18? 'Good Afternoon! Please Log In':'Good Evening! Please Log In'}</h1>
            <div className='options'>
                <Link className='option' to='/account' onClick={() => setUserType("Driver")}>Driver</Link>
                <Link className='option' to='/account' onClick={() => setUserType("Passenger")}>Passenger</Link>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    setUserType: type => dispatch(setUserType(type))
})

export default connect(null, mapDispatchToProps)(Home);

// onclick={() => setUserType('Driver')}