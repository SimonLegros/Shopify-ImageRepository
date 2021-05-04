import React from 'react';

export default function SubmitButton (props) {
        return(
            <button className="btn" type={props.type} onSubmit={props.handleSubmit}>
                <h4>{props.name}</h4>
            </button>
        )
}