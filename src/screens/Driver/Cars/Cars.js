import React, {Component} from 'react';
import {connect} from "react-redux";
import {addCar, updateCar} from "../../../redux/Cars/cars.actions";
import CarCard from "../../../components/CarCard/CarCard";
import Dropdown from "react-bootstrap/Dropdown";
import "./Cars.scss"
import DropdownButton from "react-bootstrap/DropdownButton";
import {CarTypes} from "../../../utilities/enums/CarTypes"

class Cars extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            cars: [],
            name: "",
            rowCount: 2,
            rows: [1, 3],
            plateNumber: "",
            carType: "Please select your car type",
            color: ""
        };

        this.renderAddCar = this.renderAddCar.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.addCar = this.addCar.bind(this);
        this.increaseRowCount = this.increaseRowCount.bind(this);
        this.decreaseRowCount = this.decreaseRowCount.bind(this);
        this.renderCarList = this.renderCarList.bind(this);
        this.changeNumberOfSeats = this.changeNumberOfSeats.bind(this);
        this.setCarType = this.setCarType.bind(this);
    }
    render() {
        return (
            <div>
                <div className="page">
                    <div>
                        {this.renderCarList()}
                    </div>
                    {this.renderAddCar()}
                </div>
            </div>

        );
    }
    static getDerivedStateFromProps(props, state) {
        return {
            ...state
        }
    }
    renderAddCar(){
        return (<div>
            <div>
                <div className="addCarRow">
                    <span>Nickname for Car: </span>
                    <input type="text" value={this.state.name}/>
                </div>
                <div className="addCarRow">
                    <span>Type of Car: </span>
                    <Dropdown className="carTypeMenu" >
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            <span>{this.state.carType}</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {Object.keys(CarTypes).map((key, i) => (
                                <Dropdown.Item key={i} eventKey={key} onSelect={this.setCarType}>
                                    {key}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    {/*<DropdownButton id="dropdown-basic-button" title={this.state.carType}>*/}
                    {/*    {Object.keys(CarTypes).map((key, i) => (*/}
                    {/*        <Dropdown.Item key={i} eventKey={key} onSelect={this.setCarType}>*/}
                    {/*            {key}*/}
                    {/*        </Dropdown.Item>*/}
                    {/*    ))}*/}
                    {/*</DropdownButton>*/}
                </div>
                <div className="addCarRow">
                    <span>Color of Car: </span>
                    <input type="text" value={this.state.color}/>
                </div>
                <div>
                    <span className="addCarRow">Number of Rows:</span> {this.state.rowCount}
                    <button onClick={this.increaseRowCount}>Increase # of Rows</button>
                    <button onClick={this.decreaseRowCount}>Decrease # of Rows</button>
                </div>
                <div className="addCarRow">Specify how many seats per row:</div>
                {
                    this.renderRows()
                }
            </div>
            <button onClick={this.addCar}>Add Car</button>
        </div>)
    }

    renderRows(){
        let rows = [];
        for(let i = 0; i < this.state.rowCount; ++i){
            rows.push(
                <div key={`${i}-car-rows`}>
                    <div className="addCarRow">
                        <span># of Seats for Row {i + 1}: </span>
                        <input type="number" value={this.state.rows[i]}
                               onChange={(e) => this.changeNumberOfSeats(i, e)}/>
                    </div>
                </div>
            )
        }
        return rows
    }

    increaseRowCount(){
        if (this.state.rowCount < 5) {
            this.setState((prevState, props) => {
                    return {
                        rows: [...prevState.rows, 2],
                        rowCount: prevState.rowCount + 1
                    }
            })
        }
    }

    decreaseRowCount(){
        if (this.state.rowCount > 1) {
            this.setState((prevState, props) => {
                let newRows = [...prevState.rows];
                newRows.splice(newRows.length - 1, 1);
                return {
                    rows: newRows,
                    rowCount: prevState.rowCount - 1
                }
            })
        }
    }

    changeNumberOfSeats(i, event){
        let toStore = parseInt(event.target.value);
        if (event.target.value > 0 &&
            event.target.value < 5) {
            this.setState((prevState, props) => {
                let newRows = [...prevState.rows];
                newRows[i] = toStore;
                return {
                    ...prevState,
                    rows: newRows
                }
            });
        }
    }

    addCar(){
        let seats = [];
        for(let i = 0; i < this.state.rowCount; ++i){
            seats.push(new Array(this.state.rows[i]).fill(false))
        }
        this.props.addCar({
            carType: this.state.carType,
            seats: seats
        });
        this.setState((prevState, props) => {
            return {
                ...prevState,
                car: {}
            }
        })
    }

    renderCarList(){
        let carCards = [];
        if (this.props.cars.cars.length === 0){
            carCards.push(<div>You do not have any cars! Please add one</div>)
        } else {
            for(let i = 0; i < this.props.cars.cars.length; ++i){
                carCards.push(<CarCard car={this.props.cars.cars[i]}/>)
            }
        }
        return (
            <div>
                <h2>My Cars:</h2>
                <div className="carsContainer">
                    {carCards}
                </div>
            </div>
        )
    }
    setCarType(eventKey, event){
        this.setState({
            carType: eventKey
        })
    }
    updateCar(car, index){
        let newSeats = [...car.seats];
        newSeats[index] = !newSeats[index];
        let newCar = {
            ...car,
            seats: newSeats
        }
    }
}

// Function for redux state
const mapStateToProps = state => ({
    cars: state.cars
});

// Function for to redux's reducers
const mapDispatchToProps = dispatch => ({
    addCar: car => dispatch(addCar(car)),
    updateCar: car => dispatch(updateCar(car))
});

// Connect current Class with the above two functions
export default connect(mapStateToProps, mapDispatchToProps)(Cars);
