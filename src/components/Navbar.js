import React from 'react';
import {
    Navbar,
    Nav,
} from 'react-bootstrap';

const Bar = props => {
    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Navbar.Brand href='/'>DM Gameboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href='/join'>Join</Nav.Link>
                    <Nav.Link href='/host'>Host</Nav.Link>
                    <Nav.Link href='/howto'>How To</Nav.Link>
                    <Nav.Link href="/about">About Us</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Bar;