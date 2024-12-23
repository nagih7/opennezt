import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const founderSlice = createSlice({
	name: "founder",
	initialState: {
		founderProfile: null,
		loadingGetFounderProfile: false,
		loadingUpdateFounderProfile: false,
		resultUpdateFounderProfile: false,
	},
	reducers: {
		startRequestGetFounderProfile: (state) => ({
			...state,
			loadingGetFounderProfile: true,
		}),
		startRequestGetFounderProfileSuccess: (state, action) => ({
			...state,
			founderProfile: action.payload.data,
			loadingGetFounderProfile: false,
		}),
		startRequestGetFounderProfileFail: (state) => ({
			...state,
			founderProfile: null,
			loadingGetFounderProfile: false,
		}),
		startUpdateFounderProfile: (state) => ({
			...state,
			loadingUpdateFounderProfile: true,
			resultUpdateFounderProfile: false,
		}),
		startUpdateFounderProfileSuccess: (state, action) => {
			message.success("Cập nhật thông tin thành công");
			return {
				...state,
				founderProfile: action.payload.data,
				loadingUpdateFounderProfile: false,
				resultUpdateFounderProfile: true,
			};
		},
		startUpdateFounderProfileFail: (state) => {
			message.error("Cập nhật thông tin thất bại");
			return {
				...state,
				loadingUpdateFounderProfile: false,
				resultUpdateFounderProfile: false,
			};
		},
	},
});

export const {
	startRequestGetFounderProfile,
	startRequestGetFounderProfileSuccess,
	startRequestGetFounderProfileFail,
	startUpdateFounderProfile,
	startUpdateFounderProfileSuccess,
	startUpdateFounderProfileFail,
} = founderSlice.actions;

export default founderSlice.reducer;
