import { Button } from "@chakra-ui/react";
import { getProfile } from "api/profile";
import { getExperienceLevelFramwork, getIndustryFramework } from "api/user";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EducationProfile from "../EducationProfile";
import CertificationProfile from "../CertificationProfile";
import SelectCustom from "components/UI/SelectCustom";
import { debounce } from "lodash";

const ProfessionalProfile = () => {
	const dispatch = useDispatch();

	// ========== STATE FROM REDUX STORE ========== //
	const { profile } = useSelector((state) => state.profile);
	const { industryFramework, experienceLevelFramework } = useSelector(
		(state) => state.user
	);

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
	const handleChange = debounce((event, nameSelect) => {
		setFormData({
			...formData,
			[nameSelect]: event.value,
		});
	}, 300);
	const handleSaveChanges = () => {};
	// ========== COMPONENT RENDER ========== //
	return (
		<>
			<div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
				<div>
					<h4 className="">Professional Background</h4>
				</div>
			</div>
			<div>
				<div className="px-[16px] flex flex-col gap-4">
					<SelectCustom
						multiple
						required
						label="Industry"
						placeholder="Ex: Software Engineer"
						collection={industryFramework}
						onChange={(event) => handleChange(event, "industries")}
					/>
					<SelectCustom
						required
						label="Experience Level"
						placeholder="Ex: Entry Level"
						collection={experienceLevelFramework}
						onChange={(event) => handleChange(event, "industries")}
					/>
					{/* ========== Education Profile ========== */}
					<EducationProfile />
					{/* ========== Certification Profile ========== */}
					<CertificationProfile />
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
		</>
	);
};

export default ProfessionalProfile;
