import React, { useState } from "react";
import './Login.component.css';
import PropTypes from 'prop-types';

import AuthService from "../services/auth.service";

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState();

    const handleSubmit = async evt => {
        evt.preventDefault();
        const data = await AuthService.login(username, password);
        if(data && data.token){
            console.log(data);
            setToken(data.token);
        }
        else {
            window.location.reload();
        }
    }

    const handleLogout = (evt) => {
        evt.preventDefault();
        setToken("");
        window.location.reload();
    }

    return(
        <div className="login-container">
            {!token && 
            <div>
                <h1>LOG IN</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={evt => setUserName(evt.target.value)}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={evt => setPassword(evt.target.value)}/>
                    </label>
                    <div>
                        <button type="submit">Log in</button>
                    </div>
                </form>
            </div>
            }
            {token &&
                <button onClick={handleLogout}>Logout</button>
            }
        </div>
    )
}