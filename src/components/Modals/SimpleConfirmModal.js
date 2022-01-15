import React, {Component} from 'react';
import "./ModalBase.scss"

class SimpleConfirmModal extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
        };
    }
    render() {
        return this.props.show ?
        <div className="modalBackground">
            <div className="modalContent">
                <h4>{this.props.title}</h4>
                {/*<p>{this.props.message}</p>*/}
                <button onClick={this.props.closeModal}>Confirm</button>
            </div>
        </div> : null;
    }
}

export default SimpleConfirmModal;
