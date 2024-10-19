import { createSlice } from "@reduxjs/toolkit";

const manageSlice = createSlice({
	name: "home",
	initialState: {
		totalUsers: 0,
	},
	reducers: {
		startRequestGetTotalUsers: (state) => ({
			...state,
		}),
		startRequestGetTotalUsersSuccess: (state, action) => ({
			...state,
			totalUsers: action.payload.data,
		}),
		startRequestGetTotalUsersFail: (state) => ({
			...state,
		}),
	},
});

export const {
	startRequestGetTotalUsers,
	startRequestGetTotalUsersSuccess,
	startRequestGetTotalUsersFail,
} = manageSlice.actions;

export default manageSlice.reducer;
