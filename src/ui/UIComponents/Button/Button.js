import React from 'react';
import './Button.scss'

const Button = (props)  => {
    return (
        <div className="button-wrapper">
            <div className="inner-text">
                {props.text}
            </div>
        </div>
    )
};

export default Button;
