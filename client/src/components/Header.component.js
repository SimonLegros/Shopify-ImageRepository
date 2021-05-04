import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import InlineButton from './InlineButton';
import { UserContext } from '../hooks/UserContext.service';
import useLogout from '../hooks/useLogout.service';

export default function Header() {
    const { user } = useContext(UserContext);
    const { logoutUser } = useLogout();

    return (
        <header>
            <h1>SHOPIFY CHALLENGE - IMAGE REPOSITORY</h1>
            {user
                ? <div className='btnGroup'>
                    <div>
                        <h3>
                            Hello, {user.username}.
                        </h3>
                    </div>
                    <Link to="/">
                        <InlineButton name={"<Public Images>"} />
                    </Link>
                    <Link to="/home">
                        <InlineButton name={"<My Images>"} />
                    </Link>
                    <Link to="/upload">
                        <InlineButton name={"<Upload Images>"} />
                    </Link>
                    <InlineButton name={'<Log Out>'} handleClick={logoutUser} />
                </div>
                : <div className='btnGroup'>
                    <Link to="/">
                        <InlineButton name={"<Public Images>"} />
                    </Link>
                    <Link to="/login">
                        <InlineButton name={"<Log In>"} />
                    </Link>
                    <Link to="/register">
                        <InlineButton name={"<Register>"} />
                    </Link>
                </div>
            }
        </header>
    )
}