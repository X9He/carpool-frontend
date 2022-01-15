import React from 'react';

const ErrorMessage = ({show, messages, confirm, closeMessage}) => (
    {show}?
        <div className="messageBackground">
            {messages.map((message)=> <div>message</div>)}
            <button onClick={closeMessage}>{confirm}</button>
        </div>:null
)

export default ErrorMessage;