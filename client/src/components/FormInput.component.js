import React from 'react'; 

export default function FormInput(props) {
    let fail = props.fail; 

    return(
            <input type={props.type}
            className="w-100"
            placeholder={props.placeholder}
            name={props.name}
            value={props.value}
            onChange={props.handleChange}
            onKeyDown={props.handleKeyDown}
            />
    )
}