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
import InputCustom from "components/UI/InputCustom";
import { debounce } from "lodash";

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
	const [inputTimer, setInputTimer] = useState(null);
	const [dataFilter, setDataFilter] = useState({
		keySearch: "",
		industry: "",
		experienceLevel: "",
		category: "",
		subcategory: "",
		skill: "",
		page: 1,
		perPage: 6,
	});

	// ========== USE EFFECT ========== //
	useEffect(() => {
		dispatch(recruitTalents(formRecruitTalents));
		setDataFilter(formRecruitTalents);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

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
	const handleChangeInput = (event) => {
		setDataFilter((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));

		// Xóa timer cũ nếu có
		if (inputTimer) {
			clearTimeout(inputTimer);
		}

		// Đặt timer mới
		setInputTimer(
			setTimeout(() => {
				dispatch(setFormRecruitTalents({ event }));
				dispatch(
					recruitTalents({
						...formRecruitTalents,
						keySearch: event.target.value,
					})
				);
			}, 300)
		);
	};

	const handleChangeSelect = async (event, nameSelect) => {
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

	// console.log("dataFilter", dataFilter);
	// console.log("formRecruitTalents", formRecruitTalents);

	return (
		<>
			<div className="bg-[#ffffff] rounded-md mb-8">
				<InputCustom
					height="40px"
					placeholder="Search by name, email, etc."
					value={dataFilter.keySearch}
					onChange={handleChangeInput}
					label="Search"
					name="keySearch"
				/>
			</div>
			{industryFramework?.items?.length > 0 && (
				<div className="bg-[#ffffff] rounded-md mb-8">
					<SelectCustom
						onChange={(e) => handleChangeSelect(e, "industry")}
						height="40px"
						collection={industryFramework}
						name="industry"
						label="Industry"
						// placeholder="Ex: Technology, Finance, etc."
						value={[formRecruitTalents.industry]}
					/>
				</div>
			)}
			{experienceLevelFramework?.items?.length > 0 && (
				<div className="bg-[#ffffff] rounded-md mb-8">
					<SelectCustom
						onChange={(e) => handleChangeSelect(e, "experienceLevel")}
						height="40px"
						collection={experienceLevelFramework}
						name="experienceLevel"
						label="Experience Level"
						// placeholder="Ex: Entry, Mid, Senior, etc."
						value={[formRecruitTalents.experienceLevel]}
					/>
				</div>
			)}
			{categoryFramework?.items?.length > 0 && (
				<div className="bg-[#ffffff] rounded-md mb-8">
					<SelectCustom
						onChange={(e) => handleChangeSelect(e, "category")}
						height="40px"
						collection={categoryFramework}
						name="category"
						label="Category"
						// placeholder="Ex: Web Development, Mobile Development, etc."
						value={[formRecruitTalents.category]}
					/>
				</div>
			)}
			{subCategoryFramework?.items?.length > 0 && (
				<div className="bg-[#ffffff] rounded-md mb-8">
					<SelectCustom
						onChange={(e) => handleChangeSelect(e, "subcategory")}
						height="40px"
						collection={subCategoryFramework}
						name="subcategory"
						label="Sub Category"
						// placeholder="Ex: Frontend, Backend, etc."
						value={[formRecruitTalents.subcategory]}
					/>
				</div>
			)}
			{skillFramework?.items?.length > 0 && (
				<div className="bg-[#ffffff] rounded-md mb-8">
					<SelectCustom
						onChange={(e) => handleChangeSelect(e, "skill")}
						height="40px"
						collection={skillFramework}
						name="skill"
						label="Skill"
						// placeholder="Ex: React, Node, etc."
						value={[formRecruitTalents.skill]}
					/>
				</div>
			)}
		</>
	);
};

export default FilterSidebar;
