import React, {Component} from 'react';
import './Seat.scss'

class Seat extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            isEmpty: false
        };

        this.selectSeat = this.selectSeat.bind(this);
    }
    render() {
        return (
            <div className={this.props.isEmpty ? "enabledSeat" : "disabledSeat"} onClick={this.selectSeat}>
            </div>
        );
    }
    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            isEmpty: props.isEmpty
        }
    }
    selectSeat(){
        this.props.onChange();
    }
}

export default Seat;
