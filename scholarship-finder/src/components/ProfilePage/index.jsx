import React, { useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import "./ProfilePage.css"; 

const initialProfile = {
    college: "Enter your college",
    course: "Enter your course",
    cpi: "Enter your CPI",
    region: "Enter your region",
};

export default function ProfilePage() {
    const [profile, setProfile] = useState(initialProfile);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState(profile);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        setProfile(form);
        setEditing(false);
    };

    const handleCancel = () => {
        setForm(profile);
        setEditing(false);
    };

    return (
        <div className="profile-container">
            <h1>Student Profile</h1>
            <div className="profile-box">
                <div>
                    <img className="profile-pic" src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt='Profile-pic' />
                    <h2>Student Name</h2>
                </div>
                <div className="profile-table">
                    <div>
                        <div>
                            <h3><strong>College:</strong></h3>
                            <div>
                                {editing ? (
                                    <input
                                        name="college"
                                        value={form.college}
                                        onChange={handleChange}
                                        style={{ width: "100%" }}
                                    />
                                ) : (
                                    profile.college
                                )}
                            </div>
                        </div>
                        <div>
                            <h3><strong>Course:</strong></h3>
                            <div>
                                {editing ? (
                                    <input
                                        name="course"
                                        value={form.course}
                                        onChange={handleChange}
                                        style={{ width: "100%" }}
                                    />
                                ) : (
                                    profile.course
                                )}
                            </div>
                        </div>
                        <div>
                            <h3><strong>CPI:</strong></h3>
                            <div>
                                {editing ? (
                                    <input
                                        name="cpi"
                                        value={form.cpi}
                                        onChange={handleChange}
                                        style={{ width: "100%" }}
                                    />
                                ) : (
                                    profile.cpi
                                )}
                            </div>
                        </div>
                        <div>
                            <h3><strong>Region:</strong></h3>
                            <div>
                                {editing ? (
                                    <input
                                        name="region"
                                        value={form.region}
                                        onChange={handleChange}
                                        style={{ width: "100%" }}
                                    />
                                ) : (
                                    profile.region
                                )}
                            </div>
                        </div>
                    </div>
                    {editing ? (
                        <>
                            <button onClick={handleSave} className="save-button">Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </>
                    ) : (
                        <button onClick={handleEdit} className="edit-button" >Edit Profile</button>
                    )}
                </div>
            </div>
        </div>
    );
}