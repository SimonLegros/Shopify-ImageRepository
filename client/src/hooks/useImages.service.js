import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext.service';

export default function useImages() {
    const [selectedFile, setFile] = useState(null);

    // Upload images 
    const uploadImages = async () => {
        console.log(selectedFile);
        const data = new FormData();
        data.append("file", selectedFile);
        console.log(data);
        // return axios.post('images/upload', {
        //     formData
        // }).then(async (res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     // setError(err.response.data);
        //     console.log(err.response.data)
        // })
        fetch("http://localhost:9000/images/upload", {
            method: "POST",
            body: data,
        }).then( response => {
            response.json().then( body => {
                console.log(body);
            });
        });
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