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
            <div>
                <div>
                    {this.props.car.carType}
                </div>
                <div className="seatsWrapper">
                    {this.renderCar(this.props.car)}
                </div>
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
