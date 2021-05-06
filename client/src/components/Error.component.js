import React from 'react';

export default function Error(props) {
    return(
        <div className="alert alert-danger">
            <h5>{props.error.message}</h5>
        </div>
    )
}