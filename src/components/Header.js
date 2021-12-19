import { useContext } from "react";
import { AuthContext } from "../context/authContext";

// import css 
import "../assets/css/header.css"

// import react bootstrap 
import { Navbar, Nav, Container } from 'react-bootstrap';

// import image 
import logo from "../assets/images/logo_literature.png";

export default function Header() {

    const { dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch({
          type: "LOGOUT",
        });
    };

    return (
        <div className="header">
            <Navbar>
                <Container>
                    <Navbar.Brand href="/Home">
                        <img src={logo} alt="Logo Literature" className="img-logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/Home">Home</Nav.Link>
                            <Nav.Link href="/Profile">Profile</Nav.Link>
                            <Nav.Link href="/MyCollection">My Collection</Nav.Link>
                            <Nav.Link href="/AddLiterature">Add Literature</Nav.Link>
                            <Nav.Link href="/" onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}