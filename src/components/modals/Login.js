// import css 
import "../../assets/css/login.css"

import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/authContext";
import { Modal, Form } from "react-bootstrap";
import { API, setAuthToken } from "../../config/api";
import { NotificationManager } from "react-notifications";

export default function Login(props) {
  const { show, handleClose, handleSwitch } = props;
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);

  const [inputLogin, setinputLogin] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
      setinputLogin((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(inputLogin);

      const response = await API.post("/login", body, config);

      setAuthToken(response?.data.data.token);

      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        NotificationManager.success(
          response.data.message,
          response.data.status
        );
        handleClose();
        history.push("/home");
      }
    } catch (error) {
      if (error?.response.data?.message) {
        return NotificationManager.error(
          error.response.data.message,
          error.response.data.status
        );
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="modal-login"  centered>
      <Modal.Body className="p-4" style={{ width: 416 }}>
        <h4>Sign In</h4>
        <Form action="" onSubmit={handleLogin}>
          <input
            id="email"
            type="email"
            className="mb-4 form-control modal-login-input"
            onChange={handleLoginChange}
            value={inputLogin.email}
            placeholder="Email"
            required
          />
          <input
            id="password"
            type="password"
            className="mb-4 form-control modal-login-input"
            onChange={handleLoginChange}
            value={inputLogin.password}
            placeholder="Password"
            required
          />
          <button type="submit" className="btn">
            Sign In
          </button>

          <div className="tag-line text-center">
            Don't have an account ? Klik {" "}
            <span
              className="link"
              onClick={handleSwitch}
            >
              Here
            </span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}