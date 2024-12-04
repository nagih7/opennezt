import React, { useState } from "react";
import styles from "./EditProfilePopup.module.scss";

function EditProfilePopup({ onClose }) {
    const [formData, setFormData] = useState({
        experience_level: "",
        industry: [],
        degree: "",
        certification: [],
        professional_summary: "",
        career_goals: "",
        offer: "",
        expectation: "",
        availability: "",
        areas_of_expertise: {
            accounting_and_finance: [],
            human_resource: [],
            international: [],
            law_and_legal: [],
            management: [],
            marketing: [],
            operations: [],
            sales: [],
            starting_up: [],
            sustainability: [],
            technology_and_internet: []
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, field) => {
        const { value } = e.target;
        setFormData({ ...formData, [field]: value.split(",") });
    };

    const handleNestedArrayChange = (e, field, subfield) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            areas_of_expertise: {
                ...formData.areas_of_expertise,
                [field]: value.split(",")
            }
        });
    };

    const token = localStorage.getItem('token');
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/update-founder-profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            onClose();
        } else {
            console.error('Failed to update profile');
        }
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Experience Level:
                        <input type="text" name="experience_level" value={formData.experience_level} onChange={handleChange} />
                    </label>
                    <label>
                        Industry:
                        <input type="text" name="industry" value={formData.industry.join(",")} onChange={(e) => handleArrayChange(e, "industry")} />
                    </label>
                    <label>
                        Degree:
                        <input type="text" name="degree" value={formData.degree} onChange={handleChange} />
                    </label>
                    <label>
                        Certification:
                        <input type="text" name="certification" value={formData.certification.join(",")} onChange={(e) => handleArrayChange(e, "certification")} />
                    </label>
                    <label>
                        Professional Summary:
                        <textarea name="professional_summary" value={formData.professional_summary} onChange={handleChange} />
                    </label>
                    <label>
                        Career Goals:
                        <textarea name="career_goals" value={formData.career_goals} onChange={handleChange} />
                    </label>
                    <label>
                        Offer:
                        <textarea name="offer" value={formData.offer} onChange={handleChange} />
                    </label>
                    <label>
                        Expectation:
                        <textarea name="expectation" value={formData.expectation} onChange={handleChange} />
                    </label>
                    <label>
                        Availability:
                        <input type="text" name="availability" value={formData.availability} onChange={handleChange} />
                    </label>
                    <h3>Areas of Expertise</h3>
                    {Object.keys(formData.areas_of_expertise).map((key) => (
                        <label key={key}>
                            {key.replace(/_/g, " ")}:
                            <input type="text" value={formData.areas_of_expertise[key].join(",")} onChange={(e) => handleNestedArrayChange(e, key)} />
                        </label>
                    ))}
                    <div className={styles.buttonGroup}>
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfilePopup;