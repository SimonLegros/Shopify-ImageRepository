import React, { useContext, useEffect } from 'react';
import Header from '../components/Header.component';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext.service';
import useImages from '../hooks/useImages.service';

export default function Landing() {
    const { user } = useContext(UserContext);
    const { getPublicImages, publicImages } = useImages();
    let listImages;

    if(user) {
        <Redirect to='/home'/>
    }

    useEffect(() => {
        getPublicImages();
    }, []);

    const handleRefresh = (e) => {
        e.preventDefault();
        getPublicImages();
    }

    return(
        <div className="page">
            <Header/>
           <h3>This is the public landing page</h3>
           <div>
                <button className="btn btn-primary" onClick={handleRefresh}>
                    Click to Refresh
                </button>
                <div>
                        {publicImages && publicImages.map((imageUrl) => (
                            <img 
                                src={"http://localhost:9000/"+imageUrl}
                                alt="Public Image"
                                className="img-thumbnail"
                                width="400"
                            />
                        ))}
                </div>
           </div>
        </div>
    )
}