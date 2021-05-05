import React, { useState } from 'react';
import Error from './../components/Error.component';
import Header from '../components/Header.component';
import FormInput from '../components/FormInput.component';
import SubmitButton from './../components/SubmitButton.component';
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

    return (
        <div>
            <Header />
            <div className="px-5">
                <div className="text-center m-4">
                    <h2>Here you can upload your own images</h2>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="card m-5 p-1 w-50 border-success">
                        <div className="card-body">
                            <form onSubmit={handleUpload} encType="multipart/form-data">
                                <div className="form-group">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" name="file" id="customFile" onChange={handleFileChange} />
                                        <label className="custom-file-label" for="customFile">Choose file</label>
                                    </div>
                                </div>
                                <div className="form-group form-check">
                                    <input id="privacy"
                                        type="checkbox"
                                        className="form-check-input"
                                        name="privacy"
                                        onChange={handlePrivacyChange} />
                                    <label for="privacy" className="form-check-label">Private</label>
                                </div>
                                <SubmitButton name={"Upload"} type={"submit"}/>
                            </form>
                        </div>
                        <div className="d-flex justify-content-center m-5">
                            <img src={preview} className="img-fluid w-100" alt="Image Preview" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};