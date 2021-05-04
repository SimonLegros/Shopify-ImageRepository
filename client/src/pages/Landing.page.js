import React, { useContext } from 'react';
import Header from '../components/Header.component';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext.service';

export default function Landing() {
    const { user } = useContext(UserContext);
        if(user) {
            <Redirect to='/home'/> 
        }

    return(
        <div className="page">
            <Header/>
           <h3>This is the public landing page</h3> 
        </div>
    )
}