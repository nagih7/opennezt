import { Button } from "@chakra-ui/react";
import { updateProfessionalProfile, updateSkillProfile } from "api/profile";
import {
	getCategoryFramework,
	getSkillFramework,
	getSubCategoryFramework,
} from "api/user";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../ProfileCard";
import ProfileEditMenu from "../ProfileEditMenu";
import ActionBar from "../ActionBar";
import SelectCustom from "components/UI/SelectCustom";
import { toaster } from "components/UI/toaster";

const Skills = () => {
	const dispatch = useDispatch();
	// ========== STATE FROM REDUX STORE ========== //
	const { categoryFramework, subCategoryFramework, skillFramework } =
		useSelector((state) => state.user);
	const { skills, isLoadingUpdateSkills } = useSelector(
		(state) => state.profile.profile
	);
	// ========== STATE MANAGEMENT ========== //
	const [formData, setFormData] = useState({
		categories: [],
		subcategories: [],
		skills: [],
		skillFormat: [],
	});
	const [mySkills, setMySkills] = useState([]);

	// ========== USE EFFECT ========== //
	useEffect(() => {
		dispatch(getCategoryFramework());
	}, [dispatch]);

	useEffect(() => {
		setMySkills(skills);
	}, [skills]);

	// ========== HANDLE CHANGE FUNCTION ========== //
	const handleChangeCategory = (event) => {
		setFormData({
			...formData,
			categories: event.value,
			subcategories: [],
			skills: [],
		});
		dispatch(getSubCategoryFramework(event.value[0]));
	};
	const handleChangeSubCategory = (event) => {
		setFormData({
			...formData,
			subcategories: event.value,
			skills: [],
		});
		dispatch(getSkillFramework(event.value[0]));
	};

	const handleChangeSkill = (event) => {
		console.log("items", event.items);
		setFormData({
			...formData,
			skills: event.value,
			skillFormat: event.items.map((item) => ({
				_id: item.value,
				name: item.label,
				category_id: formData.subcategories[0],
				// subcategory_id: formData.subcategories[0],
			})),
		});
	};

	const handleAddSkill = () => {
		// Verify if the skill is already added
		const isExist = mySkills.find((skill) => skill === formData.skills[0]);
		if (isExist) {
			toaster.create({
				title: `Skill already added.`,
				type: "error",
			});
		} else {
			setMySkills([...mySkills, ...formData.skillFormat]);
			setFormData({
				...formData,
				skills: [],
				skillLabels: [],
			});
		}
	};

	const handleRemoveSkill = (skill) => {
		const newSkills = mySkills.filter((item) => item.name !== skill.name);
		setMySkills(newSkills);
	};

	const handleSaveChanges = () => {
		console.log("mySkills", mySkills);
		dispatch(
			updateSkillProfile({
				skills: mySkills,
			})
		);
	};
	// ========== COMPONENT RENDER ========== //
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
							<h4 className="">Professional Background</h4>
						</div>
					</div>
					<div className="px-[16px] flex flex-col gap-8">
						<SelectCustom
							required
							label="Job Title"
							placeholder="Ex: Software Engineer"
							collection={categoryFramework}
							onChange={(event) => handleChangeCategory(event)}
							canChange
							value={formData?.categories}
						/>
						<SelectCustom
							disabled={formData?.categories?.length === 0}
							required
							label="Job Title"
							placeholder="Ex: Software Engineer"
							collection={subCategoryFramework}
							onChange={(event) => handleChangeSubCategory(event)}
							canChange
							value={formData.subcategories}
						/>
						<SelectCustom
							multiple
							disabled={formData?.subcategories?.length === 0}
							required
							label="Experience Level"
							placeholder="Ex: Entry Level"
							collection={skillFramework}
							onChange={(event) => handleChangeSkill(event)}
							canChange
							value={formData.skills}
						/>
						<div className="flex justify-end">
							<div className="">
								<Button
									disabled={formData?.skills?.length === 0}
									onClick={handleAddSkill}
									height={50}
									className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
									borderRadius={4}
									loading={false}
									loadingText="Loading..."
									spinnerPlacement="start">
									ADD
								</Button>
							</div>
						</div>
					</div>
					<div className="px-[16px] flex flex-col gap-8">
						{/* =========== SKILLS ========== */}
						{mySkills?.map((skill, index) => (
							<div
								key={index}
								className="flex items-center justify-between">
								<div className="flex gap-4">
									<p className="text-[#2f65b9] font-semibold">
										{skill.name}
									</p>
								</div>
								<div>
									<Button
										height={30}
										className="px-[16px] py-2 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
										borderRadius={4}
										loading={false}
										loadingText="Loading..."
										spinnerPlacement="start"
										onClick={() => handleRemoveSkill(skill)}>
										REMOVE
									</Button>
								</div>
							</div>
						))}
					</div>
					<div className="px-[16px] flex flex-col gap-8">
						<div className="flex justify-end">
							<div className="">
								<Button
									loading={isLoadingUpdateSkills}
									disabled={mySkills?.length === 0}
									onClick={handleSaveChanges}
									height={50}
									className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
									borderRadius={4}
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

export default Skills;
