import React, {Component} from 'react';
import Seat from "../Seat/Seat.js";
import Legend from "../Legend/Legend.component.jsx";
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
                <div className='divWithLegend'>

                    <div className="seatsWrapper">
                        {this.renderCar(this.props.car)}
                    </div>
                    <Legend legendTitle='Legend'
                            legendItem={[{name:'Enabled Seat',color: '#8021c4'}, {name:'Disabled Seat',color: '#64749b'}]}/>
                </div>
                {this.props.selectCarSeat === true ?
                    <button style={{"height": "30px"}}
                            onClick={() => this.props.deleteCar(this.props.index)}>Delete Car</button>
                    : <React.Fragment/>}
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
        row.map((seat, seatIndex) => {
            renderedRow.push(<Seat key={`${rowIndex}-row=${seatIndex}-seat`} seat={seat} isEmpty={row[seatIndex]}
                                   onChange={() => this.props.handleSeatChange(rowIndex, seatIndex)}/>)
        });
        return renderedRow;
    }
}

export default CarCard;
