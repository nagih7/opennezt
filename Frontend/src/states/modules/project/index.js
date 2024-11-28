import { createSlice } from "@reduxjs/toolkit";

const aboutYouSlice = createSlice({
	name: "ProJect",
	initialState: {
		title: "",
	},
	reducers: {
		setTitle: (state) => ({
			...state,
			title: "title",
		}),
	},
});

export const { setTitle } = aboutYouSlice.actions;

export default aboutYouSlice.reducer;
