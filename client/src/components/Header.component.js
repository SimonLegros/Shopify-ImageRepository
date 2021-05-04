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
                        <p>
                        Hello, {user.username}.
                        </p>
                    </div>
                <Link to="/">
                        <InlineButton name={"Public Images"} />
                    </Link>
                    <Link to="/home">
                        <InlineButton name={"My images"} />
                    </Link>
                    <InlineButton name={'logout'} handleClick={logoutUser} />
                </div>
                : <div className='btnGroup'>
                    <Link to="/">
                        <InlineButton name={"Public Images"} />
                    </Link>
                    <Link to="/login">
                        <InlineButton name={"login"} />
                    </Link>
                    <Link to="/register">
                        <InlineButton name={"register"} />
                    </Link>
                </div>
            }
        </header>
    )
}