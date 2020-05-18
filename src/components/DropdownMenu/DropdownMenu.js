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
            <div  className="dropdown">
                <div className="button" onClick={this.showDropdownMenu}> Choose a Car </div>

                { this.state.displayMenu ? (
                        <ul>
                            <li>
                                <a className="active">Nissan Altima</a>
                            </li>
                            <li>
                                <a className="active">Honda Civic</a>
                            </li>
                        </ul>
                    ):
                    null
                }

            </div>

        );
    }

    renderChoices(){

    }
}

export default DropdownMenu;
