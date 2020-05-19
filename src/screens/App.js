import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import NavigationBar from "../components/NavigationBar/NavigationBar";
import Cars from '../screens/Driver/Cars/Cars.js';
import CurrentTrip from '../screens/Driver/CurrentTrip/CurrentTrip.js';
import Account from '../screens/Driver/Account/Account.js';
import AddTrip from '../screens/Driver/AddTrip/AddTrip.js';
import TripTimeline from '../screens/Driver/TripTimeline/TripTimeline.js';
import {withCookies} from 'react-cookie';
import {connect} from "react-redux";
import {loginSuccess} from "../redux/User/user.actions";

class App extends Component {
    constructor(props) {
        super(props);
        this.syncCookieWithRedux();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavigationBar/>
                    <Route path="/" exact render={() => (<CurrentTrip cookies={this.props.cookies}/>)}/>
                    <Route path="/cars" exact component={Cars}/>
                    <Route path="/currenttrip" exact component={CurrentTrip}/>
                    <Route path="/account" exact component={Account}/>
                    <Route path="/addtrip" exact component={AddTrip}/>
                    <Route path="/triptimeline" exact component={TripTimeline}/>
                </div>
            </BrowserRouter>
        )
    }

    syncCookieWithRedux() {
        if (this.props.cookies.token !== "") {
            this.props.loginSuccess(this.props.cookies.token)
        }
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    loginSuccess: token => dispatch(loginSuccess(token))
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(App));
