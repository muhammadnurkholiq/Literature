import { useContext } from "react";
import { AuthContext } from "../context/authContext";

// import css 
import "../assets/css/headerAdmin.css"

// import react bootstrap 
import { Navbar, Nav, Container, Dropdown, Image } from 'react-bootstrap';

// import image 
import logo from "../assets/images/logo_literature.png"
import image from "../assets/images/profile-img.png"
import logout from "../assets/images/logout.png"

export default function HeaderAdmin() {

    const { dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch({
          type: "LOGOUT",
        });
    };
    
    return (
        <div className="headerAdmin">
            <Navbar>
                <Container>
                    <Navbar.Brand href="/home">
                        <img src={logo} alt="Logo Literature" className="img-logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Dropdown>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                    <Image src={image} alt="Dropdown image admin" roundedCircle />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Nav.Link href="/" onClick={handleLogout}>
                                        <img src={logout} alt="logout icon" />
                                        Logout
                                    </Nav.Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}