import { useState } from 'react';
import axios from 'axios';
import useFindUser from './useFindUser.service';

export default function useImages() {
    const [publicImages, setPublicImages] = useState(null);
    const [myImages, setMyImages] = useState(null);
    const {user} = useFindUser();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Upload images 
    const uploadImages = async (acceptedFiles) => {
        if(acceptedFiles.size <= 0){
            setError(Error('Need at least 1 file to upload!'));
            return;
        }
        setError(null);
        setSuccess(null);
        const data = new FormData();
        let isPrivate = document.getElementById('isPrivate').checked;
        data.append("privacy", isPrivate);
        data.append("username", user.username );
        acceptedFiles.forEach((fileWithMeta, key, map) => {
            data.append("files[]", fileWithMeta.file, fileWithMeta.file.name);
        });
        fetch("http://localhost:9000/images/upload", {
            method: "POST",
            body: data,
        })
        .then( res => res.json())
        .then( data => setSuccess(data.message))
        .catch( err => setError(err));
    };

    const getPublicImages = async() => {
        return await axios.get('images').then(res => {         
            setPublicImages(res.data.images);                   
        }).catch((err) => {
            // setError(err.response.data);
        })
    };

    const getMyImages = async() => {
        return await axios.get('images/private').then(res => {
            setMyImages(res.data.images);
            // setMyImages(res.data.images);                   
        }).catch((err) => {
            // setError(err.response.data);
        })
    };

    return {
        uploadImages,
        getPublicImages,
        getMyImages,
        publicImages,
        myImages,
        error,
        success,
    }
}