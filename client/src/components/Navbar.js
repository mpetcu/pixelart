import React, {useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { FaHippo } from 'react-icons/fa';


function NavbarArt(){
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
            <Link to="/" className="nav-link">
                <FaHippo />
            </Link>
            <Nav className="me-auto">
                <Link className="nav-link" to='/'>Home</Link> &nbsp;
                <Link className="nav-link" to='/editor'>Editor</Link>
            </Nav>
            </Container>
        </Navbar>
    );
}

export default NavbarArt



