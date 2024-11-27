import React, { useState, useEffect } from "react";
import AppLayout from "components/layouts/AppLayout";
import "./styles.scss";
// import verify from "../../../assets/images/icon/verify.png";

function ProJect() {
  const data = [
    {
            "_id": "67466f0628229b8ac9d5a737",
            "name": "My Startup Projec",
            "related_industries": [
                "Technology",
                "Healthcare"
            ],
            "stage": "Seed",
            "problem": "Lack of access to affordable healthcare",
            "solution": "An online platform that connects patients with doctors remotely.",
            "product_demo_url": "https://example.com/demo",
            "team_intro_url": "https://example.com/team",
            "pitch_deck": "uploads/pitch_decks/epgkLVJdgFRMGgyLBsszHq.pdf",
            "statistics": "More than 10,000 users within the first year",
            "target_money": "50000",
            "target_audience": "Young adults seeking affordable healthcare",
            "competitors": "Other telemedicine platforms",
            "competitive_advantage": "Lower costs and better accessibility",
            "why_now": "Rising demand for telemedicine solutions",
            "strategy": "Aggressive marketing and partnerships",
            "milestones": "Reaching 100,000 users by the end of the year",
            "about_opennezt": "A company dedicated to improving healthcare access.",
            "revenues": [],
            "user_id": "6740b8710b68e13d16e60363",
            "created_at": "2024-11-27T00:59:50.695Z",
            "updated_at": "2024-11-27T00:59:50.695Z"
    }
  ];
  // console.log(data.name);
  return (
    <AppLayout>
     <div className="project-container">
      <div className="project-infomation">
        <div className="project-avt"><img src="https://beyondexclamation.com/wp-content/uploads/2019/10/startup-image-01__1506587489_150.242.73.142-1200x600-1200x600.jpg" style={{width:"40%" }}></img></div>
        <div className="project-name">Students Manager</div>
        <div className="project-des">my project about students manager</div>
      </div>
     </div>
    </AppLayout>
  );
}

export default ProJect;
