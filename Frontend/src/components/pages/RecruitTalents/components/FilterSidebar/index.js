import React, { useEffect, useState } from "react";
import SelectCustom from "components/UI/SelectCustom";
import { useDispatch, useSelector } from "react-redux";
import {
	getCategoryFramework,
	getExperienceLevelFramwork,
	getIndustryFramework,
	getSkillFramework,
	getSubCategoryFramework,
} from "api/user";
import { recruitTalents } from "api/talent";
import { setFormRecruitTalents } from "states/modules/talent";

const FilterSidebar = () => {
	const dispatch = useDispatch();
	// ========== STATE FROM REDUX STORE ========== //
	const {
		industryFramework,
		experienceLevelFramework,
		categoryFramework,
		subCategoryFramework,
		skillFramework,
	} = useSelector((state) => state.user);
	const { formRecruitTalents } = useSelector((state) => state.talent);

	// ========== STATE ========== //
	const [dataFilter, setDataFilter] = useState({
		keySearch: "",
		industry: "",
		experience_level: "",
		category: "",
		subcategory: "",
		skill: "",
		page: 1,
		perPage: 6,
	});

	// ========== USE EFFECT ========== //
	useEffect(() => {
		dispatch(recruitTalents(dataFilter));
	}, [dispatch, dataFilter]);

	useEffect(() => {
		if (industryFramework?.items?.length === 0) {
			dispatch(getIndustryFramework());
		}
	}, [dispatch, industryFramework]);
	useEffect(() => {
		if (experienceLevelFramework?.items?.length === 0) {
			dispatch(getExperienceLevelFramwork());
		}
	}, [dispatch, experienceLevelFramework]);
	useEffect(() => {
		if (categoryFramework?.items?.length === 0) {
			dispatch(getCategoryFramework());
		}
	}, [dispatch, categoryFramework]);

	// ========== ONCHANGE FUNCTION ========== //
	const handleChange = async (event, nameSelect) => {
		setDataFilter({ ...dataFilter, [nameSelect]: event.value[0] });
		dispatch(setFormRecruitTalents({ event, nameSelect }));
		switch (nameSelect) {
			case "category":
				dispatch(getSubCategoryFramework(event.value[0]));
				dispatch(recruitTalents(formRecruitTalents));
				break;
			case "subcategory":
				dispatch(getSkillFramework(event.value[0]));
				dispatch(recruitTalents(formRecruitTalents));
				break;
			default:
				dispatch(recruitTalents(formRecruitTalents));
				break;
		}
	};

	return (
		<>
			{industryFramework?.items?.length > 0 && (
				<div className="bg-[#ffffff] rounded-md mb-8">
					<SelectCustom
						onChange={(e) => handleChange(e, "industry")}
						height="40px"
						collection={industryFramework}
						name="industry"
						label="Industry"
						placeholder="Ex: Technology, Finance, etc."
					/>
				</div>
			)}
			{experienceLevelFramework?.items?.length > 0 && (
				<div className="bg-[#ffffff] rounded-md mb-8">
					<SelectCustom
						onChange={(e) => handleChange(e, "experience_level")}
						height="40px"
						collection={experienceLevelFramework}
						name="experience_level"
						label="Experience Level"
						placeholder="Ex: Entry, Mid, Senior, etc."
					/>
				</div>
			)}
			{categoryFramework?.items?.length > 0 && (
				<div className="bg-[#ffffff] rounded-md mb-8">
					<SelectCustom
						onChange={(e) => handleChange(e, "category")}
						height="40px"
						collection={categoryFramework}
						name="category"
						label="Category"
						placeholder="Ex: Web Development, Mobile Development, etc."
					/>
				</div>
			)}
			{subCategoryFramework?.items?.length > 0 && (
				<div className="bg-[#ffffff] rounded-md mb-8">
					<SelectCustom
						onChange={(e) => handleChange(e, "subcategory")}
						height="40px"
						collection={subCategoryFramework}
						name="subcategory"
						label="Sub Category"
						placeholder="Ex: Frontend, Backend, etc."
					/>
				</div>
			)}
			{skillFramework?.items?.length > 0 && (
				<div className="bg-[#ffffff] rounded-md mb-8">
					<SelectCustom
						onChange={(e) => handleChange(e, "skill")}
						height="40px"
						collection={skillFramework}
						name="skill"
						label="Skill"
						placeholder="Ex: React, Node, etc."
					/>
				</div>
			)}
		</>
	);
};

export default FilterSidebar;
