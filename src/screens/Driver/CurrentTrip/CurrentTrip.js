import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import {fetchTrips} from "../../../redux/Trips/trips.actions";
import {withCookies} from "react-cookie";
import "./CurrentTrip.scss"

class CurrentTrip extends Component {
    constructor(props) {
        super(props);
        this.props.fetchTrips(this.props.cookies.get('token'));
        this.state = {
            currentTrip: {}
        };
    }
    static getDerivedStateFromProps(props, state) {
        let now = new Date().getTime();
        let mostCurrentTripIndex = -1;
        let minTimeSoFar = Number.MAX_SAFE_INTEGER;
        props.trips.allTrips.forEach((trip, index) => {
            let currentTripDate = new Date(trip.startTime);
            let timeDif = currentTripDate.getTime() - now;
            if (timeDif >= 0) {
                if (timeDif < minTimeSoFar) {
                    minTimeSoFar = timeDif;
                    mostCurrentTripIndex = index;
                }
            }
        })
        if (mostCurrentTripIndex !== -1) {
            let currentTrip = props.trips.allTrips[mostCurrentTripIndex];
            return {
                state,
                currentTrip: currentTrip
            };
        } else {
            return {
                ...state
            }
        }

    }
    render() {
        if (!this.isLoggedIn()) {
            return <Redirect to='/account'/>
        }
        if (this.state.currentTrip !== {}) {
            return (
                <div className="current-trip-group">
                    <h1>Upcoming Trip</h1>
                    <div>
                        <h4>Starting Address:</h4>
                        <p>{this.state.currentTrip.startAddress}</p>
                    </div>
                    <div>
                        <h4>Ending Address:</h4>
                        <p>{this.state.currentTrip.endAddress}</p>
                    </div>
                    <div>
                        <h4>Starting Time:</h4>
                        <p>{this.state.currentTrip.startTime}</p>
                    </div>
                    <div>
                        <h4>Ending Time:</h4>
                        <p>{this.state.currentTrip.endTime}</p>
                    </div>
                    <div>
                        <h4>Car:</h4>
                        <p>{this.state.currentTrip.carId}</p>
                    </div>
                </div>
            );
        }

        return (
            <h1>No up coming trips!</h1>
        );
    }

    isLoggedIn() {
        return this.props.cookies.get("token") != null && this.props.cookies.get("token") !== "";
    }
}

const mapStateToProps = state => ({
    user: state.user,
    trips: state.trips
});


const mapDispatchToProps = dispatch => ({
    fetchTrips: token => dispatch(fetchTrips(token)),
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(CurrentTrip));