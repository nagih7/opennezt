import { createListCollection } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";
import { toaster } from "components/UI/toaster";

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		errorInfoUser: {
			name: "",
			email: "",
			phone: "",
		},
		errorChangePassword: {
			currentPassword: "",
			password: "",
			confirmPassword: "",
		},
		loadingBtnUpdateInfoUser: false,
		loadingBtnChangePassword: false,
		isLoadingBtnChangeAvatar: false,
		// ========== Profile ========== //
		profile: {},
		isLoadingGetProfile: false,
		isLoadingUpdateProfile: false,
		isOpenAvatarPreview: false,
		// ========== Education ========== //
		isOpenModalCreateOrUpdateEducation: false,
		isLoadingCreateOrUpdateEducation: false,
		// ========== Certification ========== //
		isOpenModalCreateOrUpdateCertification: false,
		isLoadingCreateOrUpdateCertification: false,
		// ========== Skills ========== //
		isLoadingUpdateSkills: false,
		// ========== Organization ========== //
		organizationFramework: createListCollection({
			items: [],
		}),
		isLoadingGetAllOrganizationFramework: false,
		// ========== Additional Info ========== //
		isOpenModalCreateOrUpdateProfileAdditionalInfo: false,
		isLoadingCreateOrUpdateProfileAdditionalInfo: false,
	},
	reducers: {
		setErrorInfoUser: (state, action) => ({
			...state,
			errorInfoUser: action.payload,
		}),
		setErrorChangePassword: (state, action) => ({
			...state,
			errorChangePassword: action.payload,
		}),
		updateInfoUser: (state) => ({
			...state,
			loadingBtnUpdateInfoUser: true,
		}),
		updateInfoUserSuccess: (state, action) => {
			toaster.create({
				title: `Update info user successfully.`,
				type: "success",
			});
			return {
				...state,
				loadingBtnUpdateInfoUser: false,
			};
		},
		updateInfoUserFail: (state, action) => {
			toaster.create({
				title: `${Object.values(action.payload.data.detail)[0]}`,
				type: "error",
			});
			return {
				...state,
				loadingBtnUpdateInfoUser: false,
			};
		},
		changePassword: (state) => ({
			...state,
			loadingBtnChangePassword: true,
		}),
		changePasswordSuccess: (state) => ({
			...state,
			loadingBtnChangePassword: false,
		}),
		changePasswordFail: (state) => ({
			...state,
			loadingBtnChangePassword: false,
		}),
		changeAvatarUser: (state) => ({
			...state,
			isLoadingBtnChangeAvatar: true,
		}),
		changeAvatarUserSuccess: (state) => {
			return {
				...state,
				isLoadingBtnChangeAvatar: false,
				isOpenAvatarPreview: false,
			};
		},
		changeAvatarUserFail: (state) => ({
			...state,
			isLoadingBtnChangeAvatar: false,
		}),
		changeBackgroundUser: (state) => ({
			...state,
		}),
		changeBackgroundUserSuccess: (state) => ({
			...state,
		}),
		changeBackgroundUserFail: (state) => ({
			...state,
		}),

		// ========== Profile ========== //
		requestGetProfile: (state) => ({
			...state,
			isLoadingGetProfile: true,
		}),
		requestGetProfileSuccess: (state, action) => {
			return {
				...state,
				profile: action.payload.data,
				isLoadingGetProfile: false,
			};
		},
		requestGetProfileFail: (state) => {
			return {
				...state,
				isLoadingGetProfile: false,
			};
		},
		requestUpdateProfessionalProfile: (state) => ({
			...state,
			isLoadingUpdateProfile: true,
		}),
		UpdateProfessionalProfileSuccess: (state) => {
			toaster.create({
				title: `Update professional profile successfully.`,
				type: "success",
			});
			return {
				...state,
				isLoadingUpdateProfile: false,
			};
		},
		UpdateProfessionalProfileFail: (state) => {
			toaster.create({
				title: `Update professional profile fail.`,
				type: "error",
			});
			return {
				...state,
				isLoadingUpdateProfile: false,
			};
		},
		setIsOpenAvatarPreview: (state, action) => ({
			...state,
			isOpenAvatarPreview: action.payload,
		}),

		// ========== Education ========== //
		requestCreateOrUpdateEducation: (state) => ({
			...state,
			isLoadingCreateOrUpdateEducation: true,
		}),
		createOrUpdateEducationSuccess: (state, action) => {
			toaster.create({
				title: `${action.payload.message}`,
				type: "success",
			});
			return {
				...state,
				isLoadingCreateOrUpdateEducation: false,
				isOpenModalCreateOrUpdateEducation: false,
			};
		},
		createOrUpdateEducationFail: (state, action) => {
			toaster.create({
				title: `${Object.values(action.payload.data.detail)[0]}`,
				type: "error",
			});
			return {
				...state,
				isLoadingCreateOrUpdateEducation: false,
			};
		},
		setIsOpenModalCreateOrUpdateEducation: (state, action) => ({
			...state,
			isOpenModalCreateOrUpdateEducation: action.payload,
		}),

		// ========== Certification ========== //
		requestCreateOrUpdateCertification: (state) => ({
			...state,
			isLoadingCreateOrUpdateCertification: true,
		}),
		createOrUpdateCertificationSuccess: (state, action) => {
			toaster.create({
				title: `${action.payload.message}`,
				type: "success",
			});
			return {
				...state,
				isLoadingCreateOrUpdateCertification: false,
				isOpenModalCreateOrUpdateCertification: false,
			};
		},
		createOrUpdateCertificationFail: (state, action) => {
			toaster.create({
				title: `${Object.values(action.payload.data.detail)[0]}`,
				type: "error",
			});
			return {
				...state,
				isLoadingCreateOrUpdateCertification: false,
			};
		},
		setIsOpenModalCreateOrUpdateCertification: (state, action) => ({
			...state,
			isOpenModalCreateOrUpdateCertification: action.payload,
		}),
		// ========== Skills ========== //
		requestUpdateSkills: (state) => ({
			...state,
			isLoadingUpdateSkills: true,
		}),
		updateSkillsSuccess: (state, action) => {
			toaster.create({
				title: `${action.payload.message}`,
				type: "success",
			});
			return {
				...state,
				isLoadingUpdateSkills: false,
			};
		},
		updateSkillsFail: (state) => ({
			...state,
			isLoadingUpdateSkills: false,
		}),

		// ========== Organization ========== //
		requestgetOrganizationFramework: (state) => ({
			...state,
			isLoadingGetAllOrganizationFramework: true,
		}),
		requestgetOrganizationFrameworkSuccess: (state, action) => ({
			...state,
			isLoadingGetAllOrganizationFramework: false,
			organizationFramework: createListCollection({
				items: action.payload.data.map((organization) => ({
					label: organization.name,
					value: organization._id,
				})),
			}),
		}),
		requestgetOrganizationFrameworkFail: (state) => ({
			...state,
			isLoadingGetAllOrganizationFramework: false,
		}),
		// ========== Additional Info ========== //
		requestCreateOrUpdateProfileAdditionalInfo: (state) => ({
			...state,
			isLoadingCreateOrUpdateProfileAdditionalInfo: true,
		}),
		createOrUpdateProfileAdditionalInfoSuccess: (state) => ({
			...state,
			isLoadingCreateOrUpdateProfileAdditionalInfo: false,
			isOpenModalCreateOrUpdateProfileAdditionalInfo: false,
		}),
		createOrUpdateProfileAdditionalInfoFail: (state) => ({
			...state,
			isLoadingCreateOrUpdateProfileAdditionalInfo: false,
		}),
		setIsOpenModalCreateOrUpdateProfileAdditionalInfo: (state, action) => ({
			...state,
			isOpenModalCreateOrUpdateProfileAdditionalInfo: action.payload,
		}),
	},
});

export const {
	setErrorInfoUser,
	setErrorChangePassword,
	updateInfoUser,
	updateInfoUserSuccess,
	updateInfoUserFail,
	changePassword,
	changePasswordSuccess,
	changePasswordFail,
	changeAvatarUser,
	changeAvatarUserSuccess,
	changeAvatarUserFail,
	changeBackgroundUser,
	changeBackgroundUserSuccess,
	changeBackgroundUserFail,
	// ========== Profile ========== //
	requestGetProfile,
	requestGetProfileSuccess,
	requestGetProfileFail,
	requestUpdateProfessionalProfile,
	UpdateProfessionalProfileSuccess,
	UpdateProfessionalProfileFail,
	setIsOpenAvatarPreview,
	// ========== Education ========== //
	requestCreateOrUpdateEducation,
	createOrUpdateEducationSuccess,
	createOrUpdateEducationFail,
	setIsOpenModalCreateOrUpdateEducation,
	// ========== Certification ========== //
	requestCreateOrUpdateCertification,
	createOrUpdateCertificationSuccess,
	createOrUpdateCertificationFail,
	setIsOpenModalCreateOrUpdateCertification,
	// ========== Skills ========== //
	requestUpdateSkills,
	updateSkillsSuccess,
	updateSkillsFail,
	// ========== Organization ========== //
	requestgetOrganizationFramework,
	requestgetOrganizationFrameworkSuccess,
	requestgetOrganizationFrameworkFail,
	// ========== Additional Info ========== //
	requestCreateOrUpdateProfileAdditionalInfo,
	createOrUpdateProfileAdditionalInfoSuccess,
	createOrUpdateProfileAdditionalInfoFail,
	setIsOpenModalCreateOrUpdateProfileAdditionalInfo,
} = profileSlice.actions;

export default profileSlice.reducer;
