import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext.service';

export default function useImages() {
    const [selectedFile, setFile] = useState(null);

    // Upload images 
    const uploadImages = async () => {
        console.log(selectedFile);
        let formData = new FormData();
        formData.append("myFile", selectedFile, selectedFile.name);
        console.log(formData);
        return axios.post('images/upload', {
            formData
        }).then(async (res) => {
            console.log(res);
        }).catch((err) => {
            // setError(err.response.data);
            console.log(err.response.data)
        })
    };

    const handleChange = event => {
        setFile(event.target.files[0])
    };

    return {
        handleChange,
        uploadImages,
        selectedFile
    }
}