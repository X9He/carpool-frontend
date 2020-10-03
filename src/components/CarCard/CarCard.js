import React, {Component} from 'react';
import Seat from "../Seat/Seat.js";
import "./CarCard.scss"


class CarCard extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
        };

        this.renderCar = this.renderCar.bind(this);
        this.renderAddCar = this.renderAddCar.bind(this);
        this.selectSeat = this.selectSeat.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }
    render() {
        return (
            <div key={this.props.car._id} style={{"marginBottom": "30px"}}>
                <div>
                    <b>Car Type:</b> {this.props.car.carType}, <b>Car Name:</b> {this.props.car.name}
                </div>
                <div className="seatsWrapper">
                    {this.renderCar(this.props.car)}
                </div>
                <button style={{"height": "30px"}} onClick={() => this.props.deleteCar(this.props.index)}>Delete Car</button>
            </div>
        );
    }
    renderAddCar(){

    }
    selectSeat(index) {
        this.props.onChange(index)
    }
    renderCar(car){
        let carRendered = [];
        car.seats.map((row, index) => {
            carRendered.push(<div key={`car-row=${index}`} className="row">
                {this.renderRow(row, index)}
            </div>)
        });
        return carRendered;
    }

    renderRow(row, rowIndex){
        let renderedRow = [];
        row.map((seat, index) => {
            renderedRow.push(<Seat key={`${rowIndex}-row=${index}-seat`} seat={seat}/>)
        });
        return renderedRow;
    }
}

export default CarCard;
