import React, { useContext, useEffect } from 'react';
import Header from '../components/Header.component';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext.service';
import useImages from '../hooks/useImages.service';
import useAuth from '../hooks/useAuth.service';
import { Card } from 'react-bootstrap';

export default function Home() {

    const { user } = useContext(UserContext);
    const { getMyImages, myImages } = useImages();

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

    return (
        <div>
            <Header />
            <div className="px-5">
                <div className="text-center m-4">
                    <h2>Private page for all your images</h2>
                    <button className="btn btn-primary" onClick={handleRefresh}>
                        Click to Refresh
                    </button>
                </div>
                <div className="d-flex justify-content-around flex-wrap">
                    {myImages && myImages.map((image) => (
                        <Card 
                            style={{width:'25rem', margin:'1rem'}} 
                            bg="dark"
                            text="light"
                            border="success"
                            key={image.filename}>
                            <Card.Img variant="top" src={image.data} />
                            <Card.Body>
                                <Card.Title>{image.filename}</Card.Title>
                                <Card.Text>Private: {image.private}</Card.Text>
                            </Card.Body>
                                {/* <img
                                    key={image.data}
                                    src={image.data}
                                    alt="personnal pictures"
                                    className="img-thumbnail"
                                    width="400"
                                /> */}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
};