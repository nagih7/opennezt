import React, { useEffect, useState } from "react";
import AppLayout from "components/layouts/AppLayout";
import "./styles.scss";
import verify from "../../../assets/images/icon/verify.png";

function About() {
  const [userData, setUserData] = useState(null);
  const [userAdvanceData, setUserAdvanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); 
  const [formData, setFormData] = useState({}); 
  useEffect(() => {
    const response_advance = {
      status: 200,
      success: true,
      message: "OK",
      data: {
        _id: "6742c8adee7e7a4668d1c67d",
        user_id: "6740b8710b68e13d16e60363",
        experience_level: "Senior",
        industry: "Technology",
        areas_of_expertise: {
          accounting_and_finance: ["Financial Analysis", "Budgeting"],
          human_resource: ["Recruitment", "Employee Relations"],
          international: ["Export", "Global Market"],
          law_and_legal: ["Corporate Law", "IP Law"],
          management: ["Project Management", "Operations"],
          marketing: ["Digital Marketing", "Content Strategy"],
          operations: ["Logistics", "Supply Chain"],
          sales: ["Lead Generation", "B2B Sales"],
          starting_up: ["Startup Strategy", "Fundraising"],
          sustainability: ["Green Practices", "CSR"],
          technology_and_internet: ["Software Development", "Cloud Computing"],
        },
        created_at: "2024-11-24T06:33:17.114Z",
        updated_at: "2024-11-24T06:33:17.114Z",
      },
    };

    const { experience_level, industry, areas_of_expertise } = response_advance.data;

    setUserData({
      name: "Nguyen Huy Hoang",
      email: "hoang03072005@gmail.com",
      role: "admin",
      phone: "0992929943",
      avatar:
        "https://media.licdn.com/dms/image/v2/D5603AQGiDfe6UDQjXw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710736137769?e=1738195200&v=beta&t=FamJoPTUKDP57o9rYNjEWkoJommrWMLdpnsFsKAjhq8",
      linkedIn: "https://www.linkedin.com/in/hoanggxyuuki/",
      region: "Vietnam",
      city: "Hanoi",
      language: "Vietnamese/English",
      background: "https://media.licdn.com/dms/image/v2/D5616AQF80Dqr8GgNSQ/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1710736716523?e=1738195200&v=beta&t=RBYVgbbDq4oaehEiErIcqQyWcfQB9IrX799h7sNuNGw",
    });

    setUserAdvanceData({
      experience_level,
      industry,
      areas_of_expertise,
    });

    setLoading(false);
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
    setFormData(userData); 
  };

  const handleSaveClick = () => {
    setUserData(formData);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="loading">Loading...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="about-container">
        <div className="banner-container">
          <div className="banner">
            <div className="background">
              <img src={userData.background} alt="User Background" />
            </div>
          </div>
          <div className="avatar">
            <img src={userData.avatar} alt="User Avatar" />

          </div>
          <div className="user-info">
            {editMode ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                />
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  placeholder="Enter region"
                />
                <button onClick={handleSaveClick}>Save</button>
              </div>
            ) : (
              <>
                <h1>
                  {userData.name}
                  <img src={verify} alt="Verify" className="verify-icon" />
                  <svg
                    onClick={handleEditClick}
                    className="editicon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="41"
                    viewBox="0 0 41 41"
                    fill="none"
                  >
                    <path
                      d="M25.1914 13.6662L27.3325 15.8073L6.6509 36.4433H4.55541V34.3478L25.1914 13.6662ZM33.3912 0C32.8217 0 32.2295 0.22777 31.7968 0.660534L27.6286 4.82873L36.17 13.3701L40.3382 9.20193C41.2265 8.31362 41.2265 6.83312 40.3382 5.99036L35.0083 0.660534C34.5528 0.204993 33.9834 0 33.3912 0ZM25.1914 7.26588L0 32.4573V40.9987H8.54139L33.7328 15.8073L25.1914 7.26588Z"
                      fill="black"
                    />
                  </svg>
                </h1>
                <p>
                  {userData.city}, {userData.region}
                </p>
                <p>{userData.language}</p>
                <a
                  href={userData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn Profile
                </a>
              </>
            )}
          </div>
        </div>
		<div className="professional-background">
          <h2>Professional Background</h2>
          <p>
            <strong>Experience Level:</strong> {userAdvanceData.experience_level}
          </p>
          <p>
            <strong>Industry:</strong> {userAdvanceData.industry}
          </p>
          <h3>Areas of Expertise</h3>
          <ul>
            {Object.entries(userAdvanceData.areas_of_expertise).map(
              ([key, value]) => (
                <li key={key}>
                  <strong>{key.replace(/_/g, " ")}</strong>: {value.join(", ")}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}

export default About;

