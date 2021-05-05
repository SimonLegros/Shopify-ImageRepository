import React, { useContext, useEffect }  from 'react';
import Header from '../components/Header.component';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext.service';
import useImages from '../hooks/useImages.service';

export default function Home() {

    const { user } = useContext(UserContext);
    const { getMyImages, myImages } = useImages();
    let listImages;

    if (!user) {
        <Redirect to='/login' />
    }

    useEffect(() => {
        getMyImages();
    }, []);

    const handleRefresh = (e) => {
        e.preventDefault();
        getMyImages();
    }

    return(
        <div>
            <Header />
            <div className="px-5">
                <div className="text-center m-4">
                    <h2>Private page for all your images</h2>
                    <button className="btn btn-primary" onClick={handleRefresh}>
                        Click to Refresh
                    </button>
                </div>
                <div>
                    {myImages && myImages.map((imageUrl) => (
                        <img
                            src={"http://localhost:9000/" + imageUrl}
                            alt="Public Image"
                            className="img-thumbnail"
                            width="400"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};