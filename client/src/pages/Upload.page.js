import React from 'react';
import Header from '../components/Header.component';
import useImages from '../hooks/useImages.service';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import Error from './../components/Error.component';
import Success from './../components/Success.component';

export default function Upload() {

    const { uploadImages, error, success } = useImages();

    let acceptedFiles = new Map();

    const handleUpload = (e) => {
        e.preventDefault();
        uploadImages(acceptedFiles);
        acceptedFiles.forEach((fileWithMeta, key, map) => {
            fileWithMeta.remove();
        });
        acceptedFiles.clear();
    }

    const MyUploader = () => {

        // called every time a file's `status` changes
        const handleChangeStatus = (fileWithMeta, status) => {
            if(status === 'done') {
                acceptedFiles.set(fileWithMeta.meta.id, fileWithMeta);
            }
            if(status === "removed") {
                acceptedFiles.delete(fileWithMeta.meta.id);
            }
        }

        const config = {
            maxfiles: 5,
            accepted: "image/*",
        }
        return (
            <Dropzone
                onChangeStatus={handleChangeStatus}
                maxFiles={config.maxfiles}
                accept={config.accepted}
                inputContent={(files,extra) => (extra.reject ? "Image only" : `Drop your images here (Max ${config.maxfiles})`)}
                styles={{
                    dropzone: {borderColor: 'green'},
                    dropzoneReject: {borderColor: 'red', backgroundColor: '#DAA' },
                    previewImage: {height:'200px', maxHeight: '200px', maxWidth: '100%'},
                    inputLabel: (file, extra) => (extra.reject ? {color:'red'}:{color: 'green'}),
                }}
            />
        )
    }

    return (
        <div>
            <Header />
            <div className="container px-5">
                <div className="text-center m-4">
                    <h2>Here you can upload your own images</h2>
                </div>
                <form onSubmit={handleUpload} encType="multipart/form-data">
                    {error && <Error error={error} />}
                    {success && <Success />}
                    <div className="form-group">
                        <MyUploader />
                    </div>
                    <div className="form-group form-check">
                        <input id="isPrivate"
                            type="checkbox"
                            className="form-check-input"
                            name="privacy"/>
                        <label className="form-check-label">Private</label>
                    </div>
                    <button type="submit" className="btn btn-success">Upload</button>
                </form>
            </div>
        </div>
    )
};