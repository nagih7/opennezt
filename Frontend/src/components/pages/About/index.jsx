import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import store from "states/configureStore";
import { getFounderProfile } from "api/founder";
import FounderProfile from "components/common/FounderProfile";
import ProfileCard from "components/common/ProfileCard";
import LazyLoading from "components/UI/LazyLoading";
import EditProfilePopup from "components/common/EditProfilePopup";

function About() {
    const authUser = useSelector((state) => state.auth.authUser);
    const founderProfile = useSelector((state) => state.founder.founderProfile);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

    useEffect(() => {
        store.dispatch(getFounderProfile());
    }, []);

    const handleEditClick = () => {
        setIsEditPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsEditPopupOpen(false);
    };

    return (
        <div className={styles.aboutContainer}>
            <LazyLoading>
                <ProfileCard
                    background={authUser.background}
                    avatar={authUser.avatar}
                    name={authUser.name}
                    city={authUser.city}
                    region={authUser.region}
                    language={authUser.language}
                    linkedIn={authUser.linkedIn}
                />
                <button onClick={handleEditClick} className={styles.editButton}>Edit</button>
            </LazyLoading>
            <LazyLoading>
                <FounderProfile founderProfile={founderProfile} />
            </LazyLoading>
            {isEditPopupOpen && <EditProfilePopup onClose={handleClosePopup} />}
        </div>
    );
}

export default About;