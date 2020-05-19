import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {loginSuccess} from "../../../redux/User/user.actions";
import {connect} from "react-redux";

class CurrentTrip extends Component {
    render() {
        if (this.checkToken()) {
            return <Redirect to='/account'/>
        }
        return (
            <h1>CurrentTrip</h1>
        );
    }

    checkToken() {
        return this.props.token !== "";
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(CurrentTrip);