import React from "react";
import styles from "./styles.module.scss";
import AvatarDefault from "assets/images/default/AvatarDefault.png";
import { Button } from "antd";

const BoxBasicTalent = ({ talent, handleGetDetailTalent }) => {
   return (
      <div className={styles.boxBasicTalentWrap}>
         <div className={styles.avatarTalent}>
            <img
               src={talent.user_data.avatar || AvatarDefault}
               alt={talent.user_data.name}
               onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = AvatarDefault;
               }}
            />
         </div>
         <div className={styles.boxBasicTalentContent}>
            <div className={styles.nameTalent}>
               <h4>{talent.user_data.name}</h4>
            </div>
            <div className={styles.industriesTalent}>
               {talent.industry.join(", ")}
            </div>
            <div className={styles.moreInfoTalent}>
               <div>
                  {talent.user_data.region
                     ? talent.user_data.region + ", "
                     : ""}{" "}
                  {talent.user_data.city ? talent.user_data.city : ""}
                  {/* {talent.user_data.region}, {talent.user_data.city} */}
               </div>
               <div>{talent.user_data.language.join(", ")}</div>
            </div>
            <div className={styles.actionsTalent}>
               <Button
                  style={{
                     borderRadius: "0.5rem",
                     height: "2rem",
                  }}
                  type="primary"
                  // loading={loadingGetTalentDetails}
                  onClick={() => handleGetDetailTalent(talent.user_data._id)}
               >
                  View Details
               </Button>
            </div>
         </div>
      </div>
   );
};

export default BoxBasicTalent;
