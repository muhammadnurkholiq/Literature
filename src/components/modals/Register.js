import { useState } from "react";
import { Modal } from "react-bootstrap";
import { API } from "../../config/api";
import { NotificationManager } from "react-notifications";

// import css 
import "../../assets/css/register.css"

export default function Register(props) {
  const { show, handleClose, handleSwitch } = props

  const [inputRegister, setInputRegister] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    address: "",
  });

  const handleRegisterChange = (e) => {
    setInputRegister((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      // Create Configuration Content-type here ...
      // Content-type: application/json
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }
  
      // Convert form data to string here ...
      const body = JSON.stringify(inputRegister);

      // Insert data user to database here ...
      const response = await API.post("/register", body, config)

      // Notification
      if (response?.status === 200  ) {
        NotificationManager.success(
          response.data.message,
          response.data.status
        );
        handleClose();
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
    <Modal show={show} onHide={handleClose} className="modal-register" centered>
      <Modal.Body>
        <h4>Sign Up</h4>
        <form onSubmit={handleRegister}>
      
          <div className="mb-4">
            <input
              id="email"
              type="email"
              className="form-control modal-register-input"
              onChange={handleRegisterChange}
              value={inputRegister.email}
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4">
            <input
              id="password"
              type="password"
              className="form-control modal-register-input"
              onChange={handleRegisterChange}
              value={inputRegister.password}
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-4">
            <input
              id="fullname"
              type="text"
              className="form-control modal-register-input"
              onChange={handleRegisterChange}
              value={inputRegister.fullname}
              placeholder="Full Name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender"></label>
            <select
              id="gender"
              className="form-control modal-register-input modal-select"
              onChange={handleRegisterChange}
              value={inputRegister.gender}
              required
            >
              <option value="" selected hidden>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <input
              id="phone"
              type="text"
              className="mb-4 form-control modal-register-input"
              onChange={handleRegisterChange}
              value={inputRegister.phone}
              placeholder="Phone"
              required
            />
          </div>

          <div className="mb-4">
            <textarea
              id="address"
              type="number"
              className="mb-4 form-control modal-register-input"
              onChange={handleRegisterChange}
              value={inputRegister.address}
              placeholder="Address"
              required
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn">
              Sign Up
            </button>
          </div>

          <div className="tag-line text-center">
            Already have an account ? Klik {" "}
            <span
              className="link"
              onClick={handleSwitch}
            >
              Here
            </span>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
