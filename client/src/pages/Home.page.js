import React from 'react';
import Header from '../components/Header.component';

export default function Home() {

    return(
        <div className="page">
            <Header/>
            <h3 className="page__body">Welcome to the {`<PrivateRoute/>`} component</h3>
        </div>
    )
};