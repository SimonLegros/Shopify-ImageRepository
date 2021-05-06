import React, { useContext, useEffect } from 'react';
import Header from '../components/Header.component';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext.service';
import useImages from '../hooks/useImages.service';

export default function Landing() {
    const { user } = useContext(UserContext);
    const { getPublicImages, publicImages } = useImages();

    if (user) {
        <Redirect to='/home' />
    }

    useEffect(() => {
        getPublicImages();
    }, []);

    const handleRefresh = (e) => {
        e.preventDefault();
        getPublicImages();
    }

    return (
        <div>
            <Header />
            <div className="px-5">
                <div className="text-center m-4">
                    <h2>This is the public landing page</h2>
                    <button className="btn btn-primary" onClick={handleRefresh}>
                        Click to Refresh
                    </button>
                </div>
                <div>
                    {publicImages && publicImages.map((imageUrl) => (
                        <img key={imageUrl}
                            src={"http://localhost:9000/" + imageUrl}
                            alt="Mine"
                            className="img-thumbnail"
                            width="400"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}