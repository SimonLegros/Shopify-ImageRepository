import { useState } from 'react';
import axios from 'axios';
import useFindUser from './useFindUser.service';

export default function useImages() {
    const [selectedFile, setFile] = useState(null);
    const [preview, setPreview ] = useState(null);
    const [privacy, setPrivacy ] = useState(null);;
    const [publicImages, setPublicImages] = useState(null);
    const [privateImages, setPrivateImages] = useState(null);
    const {user, setUser, isLoading} = useFindUser();

    // Upload images 
    const uploadImages = async () => {
        console.log(selectedFile);
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("privacy", privacy);
        data.append("username", user.username );
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
        })
        .then( response => response.blob())
        .then( images => {
            let url = URL.createObjectURL(images);
            console.log(url);
            setPreview(url);
        });
    };

    const handleFileChange = event => {
        setFile(event.target.files[0])
    };

    const handlePrivacyChange = e => {
        setPrivacy(e.target.checked);
    };

    const getPublicImages = async() => {
        return await axios.get('images').then(res => {         
            setPublicImages(res.data.images); 
            console.log(res.data.images);                  
        }).catch((err) => {
            // setError(err.response.data);
        })
    };

    const getPrivateImages = async() => {
        return await axios.get('images/private').then(res => {         
            setPrivateImages(res.data.images);                   
        }).catch((err) => {
            // setError(err.response.data);
        })
    };

    return {
        handleFileChange,
        handlePrivacyChange,
        uploadImages,
        selectedFile,
        preview,
        getPublicImages,
        getPrivateImages,
        publicImages,
        privateImages,
    }
}