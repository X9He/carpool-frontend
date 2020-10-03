import React, {Component} from 'react';
import { connect } from 'react-redux';
import DropdownMenu from "../../../components/DropdownMenu/DropdownMenu";
import "./AddTrip.scss"
import Button from "../../../ui/UIComponents/Button/Button";
import { addTrip } from '../../../redux/Trips/trips.actions.js'
import {withCookies} from "react-cookie";
import {fetchCars} from "../../../redux/Cars/cars.actions";

class AddTrip extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            startAddress: "",
            endAddress: "",
            startTime: "",
            endTime: "",
            car: {}
        };

        this.saveTrip = this.saveTrip.bind(this);
        this.handleStartAddressChange = this.handleStartAddressChange.bind(this);
        this.handleEndAddressChange = this.handleEndAddressChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleCarChange = this.handleCarChange.bind(this);

        this.props.fetchCars(this.props.cookies.get('token'));
    }
    render() {
        return (
            <form className="add-trip-form">
                <div className="form-group">
                    <label>
                        Starting Address:
                    </label>
                    <input value={this.state.startAddress} onChange={this.handleStartAddressChange} />
                </div>
                <div className="form-group">
                    <label>
                        End Address:
                    </label>
                    <input value={this.state.endAddress} onChange={this.handleEndAddressChange}/>
                </div>
                <div className="form-group">
                    <label>
                        Starting Time:
                    </label>
                    <input value={this.state.startTime} onChange={this.handleStartTimeChange} />
                </div>
                <div className="form-group">
                    <label>
                        Estimated Arrival Time:
                    </label>
                    <input value={this.state.endTime} onChange={this.handleEndTimeChange}/>
                </div>
                <div className="form-group">
                    <label>
                        Car (select from my cars):
                    </label>
                    <DropdownMenu value={this.state.car} cars={this.props.cars.cars}
                                  carName={this.state.car != null && this.state.car.name != null ? this.state.car.name : "Choose A Car"}
                                  handleCarChange={this.handleCarChange}/>
                </div>
                <div className="form-group">
                    <Button text="Add Trip"/>
                </div>
            </form>
    );
    }
    saveTrip(){
        this.props.addTrip({
            ...this.state
        });
    }
    handleStartAddressChange(event){
        this.setState({
            startAddress: event.target.value
        })
    }
    handleEndAddressChange(event){
        this.setState({
            startAddress: event.target.value
        })
    }
    handleStartTimeChange(event){
        this.setState({
            startAddress: event.target.value
        })
    }
    handleEndTimeChange(event){
        this.setState({
            startAddress: event.target.value
        })
    }
    handleCarChange(car){
        this.setState({
            car: car
        })
    }
}

const mapStateToProps = state => ({
    trips: state.trips,
    cars: state.cars
});

const mapDispatchToProps = dispatch => ({
    addTrip: trip => dispatch(addTrip(trip)),
    fetchCars: token => dispatch(fetchCars(token))
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(AddTrip));