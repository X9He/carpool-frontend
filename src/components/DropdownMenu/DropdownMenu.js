import React from 'react';
import './DropdownMenu.scss';


class DropdownMenu extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            displayMenu: false,
        };

        this.renderChoices = this.renderChoices.bind(this);
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

    };

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });
    }

    render() {
        return (
            <div style={{"height": "50px"}} className="dropdown">
                <div className="button" onClick={this.showDropdownMenu}>
                    {this.props.carName}
                </div>
                { this.state.displayMenu ? this.renderChoices(this.props.cars):null}
            </div>
        );
    }

    renderChoices(cars){
        const allChoices = [];
        cars.forEach(car => {
            allChoices.push(<li key={car.name} onClick={() => {
                console.log("clicked on a menu item")
                this.props.handleCarChange(car)}}>
                <a lassName="active">{car.name}</a>
            </li>)
        });
        return (<ul> {allChoices} </ul>);
    }
}

export default DropdownMenu;
