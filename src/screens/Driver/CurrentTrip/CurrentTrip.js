import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {loginSuccess} from "../../../redux/User/user.actions";
import {connect} from "react-redux";

class CurrentTrip extends Component {
    render() {
        if (!this.isLoggedIn()) {
            return <Redirect to='/account'/>
        }
        return (
            <h1>CurrentTrip</h1>
        );
    }

    isLoggedIn() {
        return this.props.user.token !== "";
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(CurrentTrip);