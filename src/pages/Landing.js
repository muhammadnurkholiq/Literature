// import react 
import { useState, useContext } from "react";

import { AuthContext } from "../context/authContext";

// import css 
import "../assets/css/landing.css"

// import bootstrap 
import { Button } from 'react-bootstrap';

// import image 
import logo from "../assets/images/logo_literature.png";
import literature from "../assets/images/book_landing.png";

// import components 
import Login from "../components/modals/Login";
import Register from "../components/modals/Register";

export default function Landing() {
    const { dispatch } = useContext(AuthContext);

    const [show, setShow] = useState({
        login: false,
        register: false,
    });

    const handleClose = () => {
        setShow({ login: false, register: false });
    };

    const handleShowLogin = () => {
        setShow((prevState) => ({ ...prevState, login: true }));
    };

    const handleShowRegister = () => {
        setShow((prevState) => ({ ...prevState, register: true }));
    };

    const handleSwitch = () => {
        if (show.login) {
        setShow({ login: false, register: true });
        } else {
        setShow({ login: true, register: false });
        }
  };

    return (
        <div className="landing">
            <div className="container">
                <img src={logo} alt="Logo Literature" className="img-logo" />

                <div className="content">
                    <div className="content-action">
                        <h1>source <i>of</i><br/>intelligence</h1>
                        <p>Sign-up and receive unlimited accesss to all<br/>of your literatur - share your literature.</p>
                        <div className="content-action-btn">
                            <Button variant="" className="btn-signup" onClick={handleShowRegister}>Sign Up</Button>
                            <Button variant="" className="btn-signin" onClick={handleShowLogin}>Sign In</Button>
                        </div>
                    </div>
                    <div className="content-image">
                        <img src={literature} alt="Literature" className="img-literature" />
                    </div>
                </div>

                <Login
                show={show.login}
                handleClose={handleClose}
                handleSwitch={handleSwitch}
                dispatch={dispatch}
                />

                <Register
                show={show.register}
                handleClose={handleClose}
                handleSwitch={handleSwitch}
                dispatch={dispatch}
                />

            </div>
        </div>
    )

}