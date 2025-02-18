import React, { useEffect, useState } from "react";
// import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
// import { Modal } from "antd";
import { updateFounderProfile } from "api/founder";
// import ProfileCard from "components/common/ProfileCard";
// import FounderProfile from "components/common/FounderProfile";
// import LazyLoading from "components/UI/LazyLoading";
// import TalentProfileSkeleton from "components/skeleton/TalentProfileSkeleton";
import background_avt from "assets/images/background/62c2d8604604f-bp-cover-image.jpg";
import img_coin from "assets/images/icon/logo/dollar.png";
import img_dollars from "assets/images/icon/logo/money.png";
import img_diamond from "assets/images/icon/logo/diamond.png";
import img_fb from "assets/images/icon/logo/facebook.png";
import img_avt from "assets/images/background/avt.jpg";
import { IconlyCamera } from "components/UI/Iconly";
import { CheckCircleFilled } from "@ant-design/icons";
import { IconlyLocation } from "components/UI/Iconly";
import { IconlyCalendar } from "components/UI/Iconly";
import {
  IconlyProfile,
  IconlyUser,
  Iconlyuser,
  IconlyNotification,
  IconlyMessage,
  IconlyBookmark,
  IconlyDocument,
  IconlyEdit,
} from "components/UI/Iconly";
import RightSidebar from "components/common/RightSidebar";
import {Link} from "react-router-dom";

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
    <div className="relative bg-[#ffffff] w-full max-h-full mb-8">
      <div className="">
        <img src={background_avt} className="h-[400px] object-cover" />
      </div>
      <div className="absolute w-full top-[275px] px-[16px]">
        <div className="p-8 bg-[#ffffff] rounded-md">
          <div className="flex items-center w-full">
            <div className="w-4/12">
              <div className="flex flex-wrap items-center font-semibold  justify-around gap-3 mb-[16px]">
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
            <div className="flex flex-col items-center w-4/12">
              <div className="relative flex flex-col items-center bg-[#ffffff] mb-10 p-1 rounded-md ">
                <div className="absolute top-[-150px] right-[-80px] z-50 bg-[#2f65b9] w-8 h-8 rounded-full flex items-center justify-center">
                  <a href="#">
                    <IconlyCamera size={18} color={"#ffffff"} />
                  </a>
                </div>
                <a href="#" className="absolute top-[-137px]">
                  <img
                    src={img_avt}
                    className=" bg-[#ffffff] p-1 object-cover max-w-[150px] h-[150px] rounded-md"
                  />
                </a>
                <div className="absolute top-[-2px] z-50 bg-[#00c792] rounded-md flex justify-center items-center w-[68px] h-[22px]">
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
                  <span className="text-sm">Ha Noi</span>
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
            <div className="w-4/12">
              <ul className="flex flex-wrap items-center gap-5 m-0 p-0 justify-center">
                <li className="flex flex-col items-center  after:border-l-2 after:border-[#e0e6ec]">
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

        <div className="px-4 bg-[#ffffff] rounded-md my-8">
          <ul className="max-w-full overflow-x-scroll scrollbar-hide flex items-center p-0 m-0">
            <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
              <a
                href="#"
                className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
              >
                <IconlyCalendar size={20} color={"#6f7f92"} />
              </a>
              <span className="text-[#6f7f92] text-sm font-medium">
                Timeline
              </span>
            </li>
            <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
              <a
                href="#"
                className="no-underline bg-[#4374c0] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
              >
                <IconlyProfile size={20} color={"#ffffff"} />
              </a>
              <span className="text-[#4374c0] text-sm font-medium">About</span>
            </li>
            <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
              <a
                href="#"
                className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
              >
                <IconlyUser size={20} color={"#6f7f92"} />
              </a>
              <span className="text-[#6f7f92] text-sm font-medium">
                Friends
              </span>
            </li>
            <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
              <a
                href="#"
                className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
              >
                <Iconlyuser size={20} color={"#6f7f92"} />
              </a>
              <span className="text-[#6f7f92] text-sm font-medium">Groups</span>
            </li>
            <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
              <a
                href="#"
                className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
              >
                <IconlyNotification size={20} color={"#6f7f92"} />
              </a>
              <span className="text-[#6f7f92] text-sm font-medium">
                Notifications
              </span>
            </li>
            <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
              <a
                href="#"
                className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
              >
                <IconlyMessage size={20} color={"#6f7f92"} />
              </a>
              <span className="text-[#6f7f92] text-sm font-medium">
                Messages
              </span>
            </li>
            <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
              <a
                href="#"
                className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
              >
                <IconlyBookmark size={20} color={"#6f7f92"} />
              </a>
              <span className="text-[#6f7f92] text-sm font-medium">Badges</span>
            </li>
            <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
              <a
                href="#"
                className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
              >
                <IconlyDocument size={20} color={"#6f7f92"} />
              </a>
              <span className="text-[#6f7f92] text-sm font-medium">
                Courses
              </span>
            </li>
          </ul>
        </div>

        <div className="flex gap-8">
          <div className="w-10/12">
            <div className="bg-[#ffffff] rounded-md">
              <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                <h5 className="mb-0">Professional Background</h5>
                <Link
                  to="/about/edit-profile"
                  className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md"
                >
                  <IconlyEdit size={20} color={"#ffffff"} />
                </Link>
              </div>
              <div className="p-8">
                <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">
                      PROFESSIONAL SUMMARY
                    </div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium line-clamp-3">
                        A highly skilled and results-driven professional with
                        over 8 years of experience in data analysis, financial
                        modeling, and market research. Expertise in utilizing
                        advanced data analytics tools such as Python, R, SQL,
                        and Excel to derive actionable insights and improve
                        decision-making processes. Proven track record in
                        delivering high-impact reports and dashboards for
                        executive teams, driving business growth, and optimizing
                        operational efficiency. Adept at transforming complex
                        data into clear and
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">
                      EXPERIENCE LEVEL
                    </div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        Junior
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px]">
                    <div className="font-medium text-sm mb-2">
                      EDUCATION LEVEL
                    </div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        Bachelors
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px]">
                    <div className="font-medium text-sm mb-2">
                      CERTIFICATIONS
                    </div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        Professional Certifications, Bootcamps
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-[#ffffff] rounded-md mt-8">
              <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                <h5 className="mb-0">Expertise</h5>
                <a
                  href="#"
                  className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md"
                >
                  <IconlyEdit size={20} color={"#ffffff"} />
                </a>
              </div>
              <div className="p-8">
                <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">
                      ACCOUNTING AND FINANCE
                    </div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        Accounting
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">
                      HUMAN RESOURCES
                    </div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        Compensation and Benefits
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">
                      INTERNATIONAL
                    </div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        Custom and Tariffs
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">
                      LAW AND LEGAL
                    </div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        ...
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">MANAGERMENT</div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        ...
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">OPERATION</div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        ...
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">SALE</div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        ...
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">STARTING UP</div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        ...
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">
                      SUSTAINABILITY
                    </div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        ...
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">
                      TECHNOLOGY AND INTERNET
                    </div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        Technology and Internet, Website Design, Cloud Computing
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px]">
                    <div className="font-medium text-sm mb-2">MARKETING</div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        ...
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-[#ffffff] rounded-md mt-8">
              <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                <h5 className="mb-0">Work with me </h5>
                <a
                  href="#"
                  className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md"
                >
                  <IconlyEdit size={20} color={"#ffffff"} />
                </a>
              </div>
              <div className="p-8">
                <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">
                      MY CAREER GOALS
                    </div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium line-clamp-3">
                      My long-term career goal is to become a Senior Data Analyst in the Finance industry, leveraging my analytical skills to drive business growth and make data-driven decisions that optimize financial performance. In the next 3-5 years, I aim to gain expertise in advanced statistical modeling, machine learning, and predictive analytics to provide deeper insights and contribute to strategic planning. I also aspire to take on leadership responsibilities, mentoring junior analysts and leading cross-fun
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px] mb-10">
                    <div className="font-medium text-sm mb-2">
                      AVAILABILITY
                    </div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium">
                        ...
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px]">
                    <div className="font-medium text-sm mb-2">WHAT I CAN OFFER</div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium line-clamp-3">
                      With a strong foundation in data analysis and problem-solving, I can offer a combination of technical expertise and strategic thinking to help businesses leverage data for growth and efficiency. My skill set includes: Proficient in using tools like Python, R, SQL, and Excel to analyze complex datasets, extract valuable insights, and create clear, actionable reports, Expertise in financial modeling, budgeting, and forecasting to support decision-making and business strategy.
                      </p>
                    </div>
                  </li>
                  <li className="px-[16px]">
                    <div className="font-medium text-sm mb-2">EXPECTATIONS</div>
                    <div>
                      <p className="text-black text-base mb-2 font-medium line-clamp-3">
                      Expertise in analyzing large datasets to uncover trends, patterns, and actionable insights that drive business decisions. Proficient in SQL for data extraction, and advanced Excel functions for analysis and reporting.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default About;
