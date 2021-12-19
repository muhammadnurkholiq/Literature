import { useState } from "react";
import { Form } from "react-bootstrap";
import { API } from "../config/api";
import { NotificationManager } from "react-notifications";

// import component 
import InputFileAvatar from "../components/inputFileAvatar";

// import css 
import "../assets/css/profileCard.css"

// import bootstrap 
import { Button, Card } from 'react-bootstrap';

// import image
import emailIcon from "../assets/images/profile-email.png"
import genderIcon from "../assets/images/profile-gender.png"
import phoneIcon from "../assets/images/profile-phone.png"
import addressIcon from "../assets/images/profile-address.png"

export default function ProfileCard({ state }) {
    const [editable, setEditable] = useState(false);
    const [form, setForm] = useState({
        gender: state.user.gender,
        phone: state.user.phone,
        address: state.user.address,
    });

    console.log(form)

    const handleChange = (e) => {
        setForm((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
        }));
    };

    const handleEdit = async () => {
        try {
            setEditable(false);
            const config = {
                headers: {
                "Content-Type": "application/json",
                },
            };
        
            const body = JSON.stringify(form);
        
            const response = await API.put("/users", body, config)

            window.location.reload()
        } catch (error) {
            if (error?.response?.data?.message) {
                return NotificationManager.error(
                error.response.data.message,
                error.response.data.status
                );
            }
        }
    };

    return (
        <div className="profileCard">
        <h1>Profile</h1>
            <div className="profile-card">
                <div className="detail-profile">

                        <div
                        className="d-flex align-items-center"
                        style={{ width: 40 }}
                        >
                        <i className="fas fa-envelope text-danger fs-1"></i>
                        </div>

                        {editable ? (
                        <>
                            <div className="details-profile">
                                <img src={emailIcon} alt="email icon" className="profile-icon" />
                                <div className="detail-data">
                                    <p className="detail-data-value">{state.user?.email}</p>
                                    <p className="detail-data-type">Email</p>
                                </div>
                            </div>

                            <div className="details-profile">
                                <img src={genderIcon} alt="Gender icon" className="profile-edit-icon" />
                                <div className="detail-data">
                                    <select
                                        id="gender"
                                        className="form-control modal-register-input modal-select"
                                        onChange={handleChange} 
                                        value={form.gender} 
                                        required
                                        >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <p className="detail-data-type">Gender</p>
                                </div>
                            </div>

                            <div className="details-profile">
                                <img src={phoneIcon} alt="Phone icon" className="profile-edit-icon" />
                                <div className="detail-data">
                                    <Form.Group>
                                        <Form.Control 
                                        id="phone"
                                        className="profile-input" 
                                        value={form.phone} 
                                        onChange={handleChange} 
                                        type="text" 
                                        placeholder={state.user?.phone} 
                                        required
                                        />
                                    </Form.Group>
                                    <p className="detail-data-type">Mobile Phone</p>
                                </div>
                            </div>

                            <div className="details-profile">
                                <img src={addressIcon} alt="Address icon" className="profile-edit-icon" />
                                <div className="detail-data">
                                    <Form.Group>
                                        <Form.Control 
                                        id="address"
                                        className="profile-input" 
                                        value={form.email} 
                                        onChange={handleChange} 
                                        type="text" 
                                        placeholder={state.user?.address} 
                                        required
                                        />
                                    </Form.Group>
                                    <p className="detail-data-type">Address</p>
                                </div>
                            </div>
                        </>  

                        ) : (
                        <>
                            <div className="details-profile">
                                <img src={emailIcon} alt="email icon" className="profile-icon" />
                                <div className="detail-data">
                                    <p className="detail-data-value">{state.user?.email}</p>
                                    <p className="detail-data-type">Email</p>
                                </div>
                            </div>
                            <div className="details-profile">
                                <img src={genderIcon} alt="Gender icon" className="profile-icon" />
                                <div className="detail-data">
                                    <p className="detail-data-value">{state.user?.gender}</p>
                                    <p className="detail-data-type">Gender</p>
                                </div>
                            </div>
                            <div className="details-profile">
                                <img src={phoneIcon} alt="Phone icon" className="profile-icon" />
                                <div className="detail-data">
                                    <p className="detail-data-value">{state.user?.phone}</p>
                                    <p className="detail-data-type">Mobile Phone</p>
                                </div>
                            </div>
                            <div className="details-profile">
                                <img src={addressIcon} alt="Address icon" className="profile-icon" />
                                <div className="detail-data">
                                    <p className="detail-data-value">{state.user?.address}</p>
                                    <p className="detail-data-type">Address</p>
                                </div>
                            </div>
                        </>
                        )}
   
                </div>
                
                <div className="avatar-profile">
                    
                    {editable ? (
                    <>
                        <Card className="avatar-card">
                            <InputFileAvatar avatar={state.user?.avatar} />
                        </Card>
                        <div>
                            <div>
                                <Button 
                                variant="" 
                                className="avatar-btn"
                                onClick={handleEdit}
                                >
                                    Save
                                </Button>
                            </div>
                            <div>
                                <Button 
                                variant="" 
                                className="avatar-btn"
                                onClick={() => {
                                    setEditable(false);
                                }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </>
                    ) : (
                    <>

                        <Card className="avatar-card">  
                            <Card.Img className="avatar-image" src={state.user?.avatar} />   
                        </Card>
                        <div className="mb-2">
                            <Button 
                            variant="" 
                            className="avatar-btn"
                            onClick={() => {
                                setEditable(true);
                            }}
                            >
                                Edit Profile
                            </Button>
                        </div>
                    </>
                    )}
                </div>
                
            </div>
        </div>
    )
}