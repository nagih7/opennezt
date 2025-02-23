/** @type {import('tailwindcss').Config} */
export default {
	// prefix: "tw-",
	mode: 'jit',
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("tailwind-scrollbar-hide"),
		'./public/**/*.html',
		'./src/**/*.{js,jsx,ts,tsx,vue}',
	],
};
