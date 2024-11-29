import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
	name: "home",
	initialState: {
		value: "Set value",
		steps: {
			founderProfile: false,
			project: false,
		},
	},
	reducers: {
		setValue: (state, action) => ({
			...state,
			value: action.payload,
		}),
		startCheckSteps: (state, action) => ({
			...state,
		}),
		startCheckStepsSuccess: (state, action) => ({
			...state,
			steps: action.payload.data,
		}),
		startCheckStepsFail: (state) => ({
			...state,
			steps: {
				founderProfile: false,
				project: false,
			},
		}),
	},
});

export const {
	setValue,
	startCheckSteps,
	startCheckStepsSuccess,
	startCheckStepsFail,
} = homeSlice.actions;

export default homeSlice.reducer;
