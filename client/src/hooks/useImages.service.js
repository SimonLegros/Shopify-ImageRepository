import { useState } from 'react';
import axios from 'axios';
import useFindUser from './useFindUser.service';

export default function useImages() {
    const [selectedFile, setFile] = useState(null);
    const [privacy, setPrivacy ] = useState(null);;
    const [publicImages, setPublicImages] = useState(null);
    const [myImages, setMyImages] = useState(null);
    const {user, setUser, isLoading} = useFindUser();

    // Upload images 
    const uploadImages = async (acceptedFiles) => {
        // acceptedFiles.forEach((file, key, map) => {
        //     console.log(file);
        //     const data = new FormData();
        //     data.append("file", file);
        //     data.append("privacy", privacy??false);
        //     data.append("username", user.username );
        //     console.log(data);
        //     fetch("http://localhost:9000/images/upload", {
        //         method: "POST",
        //         body: data,
        //     })
        //     .then( response => console.log(response))
        //     .catch( err => console.error(err));
        // });
        const data = new FormData();
        data.append("privacy", privacy??false);
        data.append("username", user.username );
        acceptedFiles.forEach((fileWithMeta, key, map) => {
            data.append("files[]", fileWithMeta.file, fileWithMeta.file.name);
        });
        fetch("http://localhost:9000/images/upload", {
            method: "POST",
            body: data,
        })
        .then( response => {
            console.log(response);
            setFile(response);
        })
        .catch( err => console.error(err));
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

    const getMyImages = async() => {
        return await axios.get('images/private').then(res => {         
            setMyImages(res.data.images);                   
        }).catch((err) => {
            // setError(err.response.data);
        })
    };

    return {
        handleFileChange,
        handlePrivacyChange,
        uploadImages,
        selectedFile,
        getPublicImages,
        getMyImages,
        publicImages,
        myImages,
    }
}