import React from 'react';
import Error from './../components/Error.component';
import Header from '../components/Header.component';
import FormInput from '../components/FormInput.component';
import useForm from './../hooks/useForm.service';
import useImages from '../hooks/useImages.service';

export default function Upload() {

    const { handleChange, uploadImages, selectedFile } = useImages();

    const handleUpload = async (e) => {
        e.preventDefault();
        await uploadImages();
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
                    <input type="file" name="file" onChange={handleChange}/>
                    <div className="inlineForm__submit">
                        <button className="btn" type="submit">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};