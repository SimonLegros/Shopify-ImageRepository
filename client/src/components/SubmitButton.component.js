import React from 'react';

export default function SubmitButton (props) {
        return(
            <button className="btn btn-primary float-right" type={props.type} onSubmit={props.handleSubmit}>
                <h4>{props.name}</h4>
            </button>
        )
}