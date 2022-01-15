import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchTrips} from "../../../redux/Trips/trips.actions";
import {withCookies} from "react-cookie";
import "./TripTimeline.scss"

class TripTimeline extends Component {
    constructor(props) {
        super(props);
        this.props.fetchTrips(this.props.cookies.get('token'));
        this.state = {
            uuidList: []
        }

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
        const startTime = new Date(trip.startTime);
        const startTimeFormatted = startTime.toLocaleTimeString('default',{weekday:'long', year:'numeric', month:'short', day:'numeric'});
        const endTime = new Date(trip.endTime);
        const endTimeFormatted = endTime.toLocaleTimeString('default',{weekday:'long', year:'numeric', month:'short', day:'numeric'});


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
                    <p>{startTimeFormatted}</p>
                </div>
                <div>
                    <h4>Ending Time:</h4>
                    <p>{endTimeFormatted}</p>
                </div>
                <div>
                    <h4>Car Name:</h4>
                    <p>{trip.carName}</p>
                </div>
                <div>
                    <h4>Trip ID:</h4>
                    <p>{trip.uuid}</p>
                    <button onClick={()=>{
                        navigator.clipboard.writeText(trip.uuid)
                        const uuidListUpdated = [...this.state.uuidList]
                        console.log(uuidListUpdated)
                        uuidListUpdated.push(trip.uuid)
                        this.setState({
                            ...this.state,
                            uuidList:uuidListUpdated
                        })

                    }}>Copy Trip ID</button>
                    {this.state.uuidList.find(uuid => uuid === trip.uuid)?<span>copied!</span>:null}
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