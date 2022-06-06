import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link, Routes, Route } from 'react-router-dom';
import { FaHippo } from 'react-icons/fa';

function NavbarArt(){
    return (
        <Routes>
            <Route path="/editor/*"/>
            <Route path="/*" element={
                <Navbar bg="dark" variant="dark">
                    <Container fluid>
                    <Link to="/" className="nav-link">
                        <FaHippo />
                    </Link>
                    <Nav className="me-auto">
                        <Link className="nav-link" to='/'>Home</Link> &nbsp;
                        <Link className="nav-link" to='/editor' target="_blank" rel="noopener noreferrer" >Editor</Link>
                    </Nav>
                    </Container>
                </Navbar>
            }>
            </Route>
        </Routes>
    );
}

export default NavbarArt



