import React, {Component} from 'react';
import { connect } from 'react-redux';
import DropdownMenu from "../../../components/DropdownMenu/DropdownMenu";
import "./AddTrip.scss"
import Button from "../../../ui/UIComponents/Button/Button";
import { addTrip } from '../../../redux/Trips/trips.actions.js'
import {withCookies} from "react-cookie";
import {fetchCars} from "../../../redux/Cars/cars.actions";
import DateTimePicker from 'react-datetime-picker';
import SearchBar from "../../../components/SearchBar";

class AddTrip extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            startAddress: "",
            endAddress: "",
            startTime: new Date(),
            endTime: new Date(),
            car: {}
        };

        this.submitTrip = this.submitTrip.bind(this);
        this.handleStartAddressChange = this.handleStartAddressChange.bind(this);
        this.handleEndAddressChange = this.handleEndAddressChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleCarChange = this.handleCarChange.bind(this);
        this.changeStartTime = this.changeStartTime.bind(this);
        this.changeEndTime = this.changeEndTime.bind(this);

        this.props.fetchCars(this.props.cookies.get('token'));
    }
    render() {
        return (
                <form className="add-trip-form">
                    <div className="form-group">
                        <label>
                            Starting Address:
                        </label>
                        <SearchBar onPlaceLoaded={this.handleStartAddressChange}/>
                    </div>
                    <div className="form-group">
                        <label>
                            End Address:
                        </label>
                        <SearchBar onPlaceLoaded={this.handleEndAddressChange}/>
                    </div>
                    <div className="form-group">
                        <label>
                            Starting Time:
                        </label>
                        <div>
                            <DateTimePicker onChange={this.changeStartTime} value={this.state.startTime} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>
                            Estimated Arrival Time:
                        </label>
                        <div>
                            <DateTimePicker onChange={this.changeEndTime} value={this.state.endTime} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>
                            Car (select from my cars):
                        </label>
                        <DropdownMenu value={this.state.car} cars={this.props.cars.cars}
                                      carName={this.state.car != null && this.state.car.name != null ? this.state.car.name : "Choose A Car"}
                                      handleCarChange={this.handleCarChange}/>
                    </div>
                    <div onClick={this.submitTrip} className="form-group">
                        <Button text="Submit"/>
                    </div>
                </form>
    );
    }
    submitTrip(){
        const tripToBeSubmitted = {
            carId: this.state.car['_id']['$oid'],
            startAddress: this.state.startAddress['formatted_address'],
            endAddress: this.state.endAddress['formatted_address'],
            startTime: this.state.startTime,
            endTime: this.state.endTime
        }
        this.props.addTrip(this.props.cookies.get("token"), tripToBeSubmitted);
    }
    handleStartAddressChange(address){
        this.setState({
            startAddress: address
        })
    }
    handleEndAddressChange(address){
        this.setState({
            endAddress: address
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
    changeStartTime(time) {
        this.setState({
            startTime: time
        })
    }
    changeEndTime(time) {
        this.setState({
            endTime: time
        })
    }
}

const mapStateToProps = state => ({
    trips: state.trips,
    cars: state.cars
});

const mapDispatchToProps = dispatch => ({
    addTrip: (token, trip) => dispatch(addTrip(token, trip)),
    fetchCars: token => dispatch(fetchCars(token))
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(AddTrip));