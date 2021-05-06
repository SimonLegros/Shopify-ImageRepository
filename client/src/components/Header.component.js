import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext.service';
import useLogout from '../hooks/useLogout.service';
import { Navbar, Nav } from "react-bootstrap";

export default function Header() {
    const { user } = useContext(UserContext);
    const { logoutUser } = useLogout();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">
                <img
                    className="d-inline-block align-top"
                    src="shopify_glyph.png"
                    alt="icon"
                    width="40" height="40"
                />{' '}
                Shopify Challenge - Image Repository
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Public Images</Nav.Link>
                    {user
                        ? <>
                            <Nav.Link as={Link} to="/home">My Images</Nav.Link>
                            <Nav.Link as={Link} to="/upload">Upload Images</Nav.Link>
                            <Nav.Link>
                                <span onClick={logoutUser}>Log Out</span>
                            </Nav.Link>
                        </>
                        : <>
                            <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>
                    }
                </Nav>
                {user &&
                    <Navbar.Text>
                        Signed in as <b>{user.username}</b>
                    </Navbar.Text>
                }
            </Navbar.Collapse>
        </Navbar>
    )
}