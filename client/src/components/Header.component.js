import React, { useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './Header.component.css';

export default function Header() {
    const [token, setToken] = useState();
    const [username, setUserName] = useState();

    console.log("Token: ", token);

    return(
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand>Image Repository</Navbar.Brand>
                <Nav className="mr-auto">
                    {!token && <Nav.Link as={Link} to="/login">Log In</Nav.Link>}
                    {token &&
                        <Nav.Link as={Link} to="/private">My Image</Nav.Link>
                        &&
                        <Nav.Link>Log Out</Nav.Link>
                    }
                    
                </Nav>
                {token && username &&
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as : {username}
                        </Navbar.Text>
                    </Navbar.Collapse>
                }
            </Navbar>
        </div>
    )
}