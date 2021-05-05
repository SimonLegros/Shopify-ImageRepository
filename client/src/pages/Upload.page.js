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
            <div className="inlineForm">
            <h3 className="page__body">Here you can upload your own images</h3>
                <div className="inlineForm__notif">
                    {/* {error && <Error error={error.messages} />} */}
                </div>
                <form onSubmit={handleUpload} encType="multipart/form-data">
                    <input type="file" name="file" onChange={handleFileChange}/>
                    <label>Private ?</label>
                    <input type="checkbox" name="privacy" defaultChecked={false} value={true} onChange={handlePrivacyChange}/>
                    <div className="inlineForm__submit">
                        <button className="btn btn-primary" type="submit">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
            <img src={preview} ckassName="image" alt="Image Preview" />
        </div>
    )
};