import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import { updateFounderProfile } from "api/founder";
import ProfileCard from "components/common/ProfileCard";
import FounderProfile from "components/common/FounderProfile";
import LazyLoading from "components/UI/LazyLoading";
import TalentProfileSkeleton from "components/skeleton/TalentProfileSkeleton";
import background_avt from "assets/images/background/62c2d8604604f-bp-cover-image.jpg";
import img_coin from "assets/images/icon/logo/dollar.png";
import img_dollars from "assets/images/icon/logo/money.png";
import img_diamond from "assets/images/icon/logo/diamond.png";
import img_fb from "assets/images/icon/logo/facebook.png";
import img_avt from "assets/images/background/avt.jpg";
import { IconlyCamera } from "components/UI/Iconly";
import { CheckCircleFilled } from "@ant-design/icons";
import { IconlyLocation } from "components/UI/Iconly";

const EditProfilePopup = React.lazy(() =>
  import("components/common/EditProfilePopup")
);

const About = () => {
  const dispatch = useDispatch();

  const [infoUpdateProfile, setInfoUpdateProfile] = useState({
    experience_level: null,
    industry: [],
    degree: null,
    certification: [],
    professional_summary: "",
    career_goals: "",
    offer: "",
    expectation: "",
    availability: null,
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
      technology_and_internet: [],
    },
  });

  const {
    founderProfile,
    resultUpdateFounderProfile,
    loadingGetFounderProfile,
  } = useSelector((state) => state.founder);

  const [modalUpdateFounderProfile, setModalUpdateFounderProfile] =
    useState(false);
  const [updatedFounderProfile, setUpdatedFounderProfile] = useState(false);

  useEffect(() => {
    if (resultUpdateFounderProfile) {
      setModalUpdateFounderProfile(false);
    }
  }, [resultUpdateFounderProfile]);

  const handleOpenModal = () => {
    setModalUpdateFounderProfile(true);
    if (founderProfile && !updatedFounderProfile) {
      setInfoUpdateProfile(founderProfile);
      setUpdatedFounderProfile(true);
    }
  };

  const handleClosePopup = () => {
    setModalUpdateFounderProfile(false);
  };

  const onChange = (event, nameSelect) => {
    if (nameSelect && nameSelect.ExpertiseTarget) {
      setInfoUpdateProfile((prevState) => ({
        ...prevState,
        areas_of_expertise: {
          ...prevState.areas_of_expertise,
          [nameSelect.ExpertiseTarget]: event,
        },
      }));
    } else if (nameSelect) {
      setInfoUpdateProfile((prevState) => ({
        ...prevState,
        [nameSelect]: event,
      }));
    } else {
      const { name, value } = event.target;
      setInfoUpdateProfile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleUpdateProfile = async () => {
    dispatch(
      updateFounderProfile(
        infoUpdateProfile,
        updatedFounderProfile ? "put" : "post"
      )
    );
  };

  return (
    // <div className={styles.aboutContainer}>
    // 	<ProfileCard handleOpenModal={handleOpenModal} />
    // 	{loadingGetFounderProfile ? (
    // 		<TalentProfileSkeleton />
    // 	) : (
    // 		founderProfile && <FounderProfile founderProfile={founderProfile} />
    // 	)}
    // 	<Modal
    // 		title=""
    // 		okText="Save"
    // 		open={modalUpdateFounderProfile}
    // 		onOk={handleUpdateProfile}
    // 		confirmLoading={false}
    // 		onCancel={handleClosePopup}
    // 		width={1000}>
    // 		<LazyLoading>
    // 			<EditProfilePopup
    // 				formData={infoUpdateProfile}
    // 				onChange={onChange}
    // 			/>
    // 		</LazyLoading>
    // 	</Modal>
    // </div>
    <div className="bg-[#ffffff] max-h-full mb-8">
      <div
        style={{
          backgroundImage:
            "url(https://wordpress.iqonic.design/product/wp/socialv/wp-content/themes/socialv-themes/assets/images/redux/default-cover.jpg)",
        }}
        className="h-[400px] w-[1200px] bg-cover object-cover"
      >
      </div>
      <div className="px-[16px]">
        <div className="p-8   bg-[#ffffff] rounded-md">
          <div className="flex items-center w-full mx-[-16px]">
            <div className="font-semibold w-4/12">
              <div className="flex items-center justify-around gap-4 mb-[16px]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6">
                    <img src={img_coin} />
                  </div>
                  <div>
                    <span>8635</span>
                    <span>Coins</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6">
                    <img src={img_dollars} />
                  </div>
                  <div>
                    <span>18635</span>
                    <span>Credits</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6">
                    <img src={img_diamond} />
                  </div>
                  <div>
                    <span>100</span>
                    <span>Gems</span>
                  </div>
                </div>
              </div>
              <ul className="flex items-center justify-center gap-4 p-0 m-0">
                <li>
                  <a href="Facebook">
                    <img src={img_fb} className="w-8 h-8" />
                  </a>
                </li>
                <li>
                  <a href="Facebook">
                    <img src={img_fb} className="w-8 h-8" />
                  </a>
                </li>
                <li>
                  <a href="Facebook">
                    <img src={img_fb} className="w-8 h-8" />
                  </a>
                </li>
                <li>
                  <a href="Facebook">
                    <img src={img_fb} className="w-8 h-8" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-4/12">
              <div className=" bg-[#ffffff] mb-10 p-1 rounded-md ">
                <div className=" bg-[#2f65b9] w-8 h-8 rounded-full flex items-center justify-center">
                  <a href="#">
                    <IconlyCamera size={18} color={"#ffffff"} />
                  </a>
                </div>
                <a href="#">
                  <img
                    src={img_avt}
                    className=" bg-[#ffffff] p-1 object-cover max-w-[150px] h-[150px] rounded-md"
                  />
                </a>
                <div className=" bg-[#00c792] rounded-md flex justify-center items-center w-[68px] h-[22px]">
                  <span className="text-white">online</span>
                </div>
              </div>
              <h5>
                Young Truong
                <CheckCircleFilled className="text-[#3897f0] mx-[6px]" />
              </h5>
              <div className="flex items-center mt-[8px] gap-4">
                <div className="flex items-center gap-1 text-[#6f7f92] font-medium">
                  <IconlyLocation size={15} color={"#000000"} />
                  <span className="text-sm">Ho Chi Minh City, Vietnam</span>
                </div>
                <div className="flex items-center gap-1 text-[#6f7f92] font-medium">
                  <IconlyLocation size={15} color={"#000000"} />
                  <span className="text-sm">
                    <a href="#" className="no-underline text-[#6f7f92]">
                      iqonic.deshjhjign/
                    </a>
                  </span>
                </div>
              </div>
              <div className="mt-[16px]"></div>
            </div>
            <div className="w-4/12 flex items-center flex-wrap justify-center">
              <ul className="flex items-center gap-5 m-0 p-0 justify-center">
                <li>
                  <h5>0</h5>
                  Posts
                </li>
                <li>
                  <h5>0</h5>
                  Posts
                </li>
                <li>
                  <h5>0</h5>
                  Posts
                </li>
                <li>
                  <h5>0</h5>
                  Posts
                </li>
                <li>
                  <h5>0</h5>
                  Posts
                </li>
                <li>
                  <h5>0</h5>
                  Posts
                </li>
              </ul>
            </div>
          </div>
        </div>
		
      </div>
    </div>
  );
};

export default About;
