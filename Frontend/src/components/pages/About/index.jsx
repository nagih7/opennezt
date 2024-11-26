import React, { useEffect, useState } from "react";
import AppLayout from "components/layouts/AppLayout";
import "./styles.scss";
import verify from "../../../assets/images/icon/verify.png";

function About() {
  const [userData, setUserData] = useState(null);
  const [userAdvanceData, setUserAdvanceData] = useState(null);
  const [loading, setLoading] = useState(true);

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
            <h1>
              {userData.name}
              <img src={verify} alt="Verify" className="verify-icon" />
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
