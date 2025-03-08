import { Button, Input } from "@chakra-ui/react";
import { getProfile } from "api/profile";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExperienceLevelFramwork, getIndustryFramework } from "api/user";
import ProfileEditMenu from "../ProfileEditMenu";
import ProfileCard from "../ProfileCard";
import ActionBar from "../ActionBar";

const Expertise = () => {
	const dispatch = useDispatch();
	// ========== STATE FROM REDUX STORE ========== //
	const { profile } = useSelector((state) => state.profile);
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
			<ProfileEditMenu />
			<div className="w-8/12">
				<div className="bg-[#ffffff] p-8 rounded-md">
					{/* =========== Profile Card ========== */}
					<ProfileCard />
					{/* =========== Action Bar  ========== */}
					<ActionBar />
				</div>
				<div className="bg-[#ffffff] p-8 rounded-md mt-8">
					<div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
						<div>
							<h4 className="">Expertise</h4>
						</div>
					</div>
					<div>
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
