import { useState } from 'react';

export default function useForm({initialValue}) {
    const [ values, setValues ] = useState(initialValue || {});

    const handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        setValues({
            ...values,
            [name]: value
        });
    };

    return {
        handleChange,
        values
    }
}