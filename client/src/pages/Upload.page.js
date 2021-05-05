import React, { useState } from 'react';
import Error from './../components/Error.component';
import Header from '../components/Header.component';
import FormInput from '../components/FormInput.component';
import useForm from './../hooks/useForm.service';
import useImages from '../hooks/useImages.service';

export default function Upload() {

    const { handleFileChange, handlePrivacyChange, uploadImages, selectedFile, preview } = useImages();

    // const handleUpload = async (e) => {
    //     e.preventDefault();
    //     await uploadImages();
    // }
    const handleUpload = (e) => {
        e.preventDefault();
        uploadImages();
    }

    return(
        <div className="page">
            <Header/>
            <div className="">
                <h3 className="page__body">Here you can upload your own images</h3>
                <form onSubmit={handleUpload} encType="multipart/form-data">
                    <div className="form-group">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" name="file" id="customFile" onChange={handleFileChange}/>
                            <label className="custom-file-label" for="customFile">Choose file</label>
                        </div>
                    </div>
                    <div className="form-group form-check">
                        <input id="privacy" 
                            type="checkbox" 
                            className="form-check-input"
                            name="privacy"
                            onChange={handlePrivacyChange}/>
                        <label for="privacy" className="form-check-label">Private</label>
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Upload
                    </button>
                </form>
            </div>
            <div>
                <img src={preview} className="img-fluid" alt="Image Preview" />
            </div>
        </div>
    )
};