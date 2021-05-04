import { useState } from 'react';

export default function useFileUploader({initialValue}) {
    const [ selectedFile, setFile ] = useState(initialValue || {});

    const handleChange = event => {
        setFile({
            selectedFile: event.target.files[0]
        })
    };

    return {
        handleChange,
        selectedFile
    }
}