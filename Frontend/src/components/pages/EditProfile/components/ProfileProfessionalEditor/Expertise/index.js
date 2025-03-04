import { Avatar, Button, Input } from "@chakra-ui/react";
import { getProfile } from "api/profile";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleFilled } from "@ant-design/icons";
import {
	IconlyArrowDown2,
	IconlyArrowUp2,
	IconlyHome,
	IconlyLogout,
	IconlyMessage,
	IconlyProfile,
} from "components/UI/Iconly";
import { Link } from "react-router-dom";
import { getExperienceLevelFramwork, getIndustryFramework } from "api/user";

const Expertise = () => {
	const { authUser } = useSelector((state) => state.auth);
	// ========== STATE MANAGEMENT ========== //
	const [isOpen, setIsOpen] = useState(true);

	const dispatch = useDispatch();
	// ========== STATE FROM REDUX STORE ========== //
	const { profile } = useSelector((state) => state.profile);
	const { industries } = useSelector((state) => state.user);
	const { experienceLevels } = useSelector((state) => state.user);
	// ========== STATE MANAGEMENT ========== //
	const [formData, setFormData] = useState({
		industries: [],
		experience_level: [],
		educations: [],
		certifications: [],
	});
	// ========== USE EFFECT ========== //
	useEffect(() => {
		dispatch(getProfile());
		dispatch(getIndustryFramework());
		dispatch(getExperienceLevelFramwork());
	}, [dispatch]);

	useEffect(() => {
		if (profile) {
			setFormData({
				...formData,
				industries: profile?.industries?.map((industry) => industry._id),
				experience_level: [profile?.experience_level?._id],
			});
		}
		// eslint-disable-next-line
	}, [profile]);

	// ========== HANDLE CHANGE FUNCTION ========== //
	const handleChange = async (event, nameSelect) => {
		setFormData({
			...formData,
			[nameSelect]: event.value,
		});
	};
	const handleSaveChanges = () => {
		console.log(formData);
	};

	return (
		<div className="flex gap-8 w-full py-8 px-[16px]">
			<div className="w-4/12">
				{/* ========== Profile Edit Menu ========== */}
				<h6>
					<div
						className="flex items-center justify-between text-[#ffffff] bg-[#2f65b9] py-[16px] px-[20px] rounded-md cursor-pointer"
						onClick={() => setIsOpen(!isOpen)}>
						<div className="flex items-center gap-2">
							<IconlyProfile size={18} color={"#ffffff"} />
							Profile Settings
						</div>
						<div
							className={`transition-transform duration-300 ${
								isOpen ? "rotate-180" : "rotate-0"
							}`}>
							{isOpen ? (
								<IconlyArrowUp2 size={18} color={"#ffffff"} />
							) : (
								<IconlyArrowDown2 size={18} color={"#ffffff"} />
							)}
						</div>
					</div>
				</h6>
				<div
					className={`mt-3 bg-[#ffffff] overflow-hidden transition-all duration-500 ease-in-out ${
						isOpen ? "max-h-screen" : "max-h-0"
					}`}>
					<div className="px-[24px]">
						<div className="px-[24px]">
							<ul className="flex flex-col items-center pl-0 mb-0">
								<li className=" w-full text-sm py-[21px] border-b-[1px]  border-gray-200 ">
									<Link
										to={"/about/edit-profile/professional-background"}
										className="text-[#6f7f92]  no-underline ">
										Professional Background
									</Link>
								</li>
								<li className=" w-full text-sm py-[21px] border-b-[1px]  border-gray-200 ">
									<Link
										to={"/about/edit-profile/expertise"}
										className="text-black no-underline ">
										Expertise
									</Link>
								</li>
								<li className=" w-full text-sm py-[21px] ">
									<Link
										to={"/about/edit-profile/work-with-me"}
										className="text-[#6f7f92]  no-underline ">
										Work with me
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="w-8/12">
				<div className="bg-[#ffffff] p-8 rounded-md">
					{/* =========== Profile Card ========== */}
					<div className="flex items-center gap-3 pb-8 border-b-[1px] border-gray-200 mb-8">
						<div>
							<Avatar.Root shape={"rounded"} size={"2xl"}>
								<Avatar.Fallback name={authUser.name} />
								<Avatar.Image src={authUser.avatar} />
							</Avatar.Root>
						</div>
						<div>
							<h4 className="flex items-center">
								Vuong Manh Nghia
								<CheckCircleFilled className="text-[#3897f0] ml-2" />
							</h4>
							<span className="text-[#6f7f92]">Member since 2021</span>
							<span className="text-[#6f7f92]">
								{authUser?.created_at
									? `Member since ${new Date(
											authUser.created_at
									  ).getFullYear()}`
									: ""}
							</span>
						</div>
					</div>
					{/* =========== Active Menu  ========== */}
					<div>
						<ul className="flex gap-3 pl-0 mb-0">
							<li>
								<a
									href="#"
									className="flex items-center justify-center bg-[#f8f9fa] h-[60px] w-[60px] rounded-md">
									<IconlyHome size={25} color={"#6f7f92"} />
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center bg-[#f8f9fa] h-[60px] w-[60px] rounded-md">
									<IconlyProfile size={25} color={"#6f7f92"} />
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center bg-[#f8f9fa] h-[60px] w-[60px] rounded-md">
									<IconlyMessage size={25} color={"#6f7f92"} />
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center bg-[#f8f9fa] h-[60px] w-[60px] rounded-md">
									<IconlyLogout size={25} color={"#6f7f92"} />
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="bg-[#ffffff] p-8 rounded-md mt-8">
					<div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
						<div>
							<h4 className="">Expertise</h4>
						</div>
					</div>
					<div>
						{/* <div className="px-[16px]">
              <div className="relative mb-8">
                <SelectRoot
                  value={formData.industries}
                  onValueChange={(event) => handleChange(event, "industries")}
                  height={50}
                  width={"100%"}
                  className="w-full border-[1px] outline-none border-gray-200 rounded-md flex justify-center "
                  multiple
                  collection={industryFramework}
                  size="sm"
                >
                  <SelectTrigger>
                    <SelectValueText className="p-[6px]" placeholder="Movie" />
                  </SelectTrigger>
                  <SelectContent width={"100%"} className="w-full">
                    {industryFramework.items.map((item) => (
                      <SelectItem
                        className="p-[12px] w-full outline-none  rounded-md"
                        item={item}
                        key={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
                <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                >
                  Industries
                </label>
                <p className="mt-[11px] mb-0 flex justify-end">
                  <button className="bg-[#f07a3a] text-xs font-medium py-1 px-[6px] text-[#ffffff] rounded-sm">
                    CHANGE
                  </button>
                </p>
              </div>
            </div>
            <div className="px-[16px]">
              <div className="relative mb-8">
                <SelectRoot
                  value={formData.experience_level}
                  onValueChange={(event) =>
                    handleChange(event, "experience_level")
                  }
                  height={50}
                  width={"100%"}
                  className="w-full border-[1px] outline-none border-gray-200 rounded-md flex justify-center "
                  collection={experienceLevelFramework}
                  size="sm"
                >
                  <SelectTrigger>
                    <SelectValueText className="p-[6px]" placeholder="Movie" />
                  </SelectTrigger>
                  <SelectContent width={"100%"} className="w-full">
                    {experienceLevelFramework.items.map((item) => (
                      <SelectItem
                        className="p-[12px] w-full outline-none  rounded-md"
                        item={item}
                        key={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
                <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                >
                  Experience Level
                </label>
                <p className="mt-[11px] mb-0 flex justify-end">
                  <button className="bg-[#f07a3a] text-xs font-medium py-1 px-[6px] text-[#ffffff] rounded-sm">
                    CHANGE
                  </button>
                </p>
              </div>
            </div> */}
						<div className="px-[16px]">
							<div className="relative mb-8">
								<Input
									height={50}
									type="url"
									placeholder="B2B"
									className="p-[16px] w-full border-[1px] outline-none border-gray-200 rounded-md "
								/>
								<label
									htmlFor=""
									className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
									Business Models
								</label>
								<p className="mt-[11px] mb-0 flex justify-end">
									<button className="bg-[#f07a3a] text-xs font-medium py-1 px-[6px] text-[#ffffff] rounded-sm">
										CHANGE
									</button>
								</p>
							</div>
						</div>
						<div className="px-[16px]">
							<div className="relative mb-8">
								<Input
									height={50}
									type="url"
									placeholder="B2C"
									className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
								/>
								<label
									htmlFor=""
									className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
									Business Models
								</label>
								<p className="mt-[11px] mb-0 flex justify-end">
									<button className="bg-[#f07a3a] text-xs font-medium py-1 px-[6px] text-[#ffffff] rounded-sm">
										CHANGE
									</button>
								</p>
							</div>
						</div>
						<div className="px-[16px] flex justify-end">
							<div className="">
								<Button
									onClick={handleSaveChanges}
									height={50}
									className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
									borderRadius={4}
									loading={false}
									loadingText="Loading..."
									spinnerPlacement="start">
									SAVE CHANGES
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Expertise;
