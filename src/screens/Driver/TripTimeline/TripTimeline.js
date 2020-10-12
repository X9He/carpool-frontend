import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchTrips} from "../../../redux/Trips/trips.actions";
import {withCookies} from "react-cookie";
import "./TripTimeline.scss"

class TripTimeline extends Component {
    constructor(props) {
        super(props);
        this.props.fetchTrips(this.props.cookies.get('token'));
    }

    render() {
        const allTripsRendered = [];
        this.props.trips.allTrips.forEach((trip) => {
            console.log("getting trip from" + trip)
            allTripsRendered.push(this.renderOneTrip(trip));
        })
        return (
            <div className="all-trips-container">{allTripsRendered}</div>
        )
    }

    renderOneTrip(trip) {
        return (
            <div className="trip">
                <div>
                    <h4>Starting Address:</h4>
                    <p>{trip.startAddress}</p>
                </div>
                <div>
                    <h4>Ending Address:</h4>
                    <p>{trip.endAddress}</p>
                </div>
                <div>
                    <h4>Starting Time:</h4>
                    <p>{JSON.stringify(trip.startTime)}</p>
                </div>
                <div>
                    <h4>Ending Time:</h4>
                    <p>{JSON.stringify(trip.startTime)}</p>
                </div>
                <div>
                    <h4>Car Name:</h4>
                    <p>{trip.carName}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    trips: state.trips
});

const mapDispatchToProps = dispatch => ({
    fetchTrips: token => dispatch(fetchTrips(token)),
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(TripTimeline));