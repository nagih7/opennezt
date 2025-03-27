/** @type {import('tailwindcss').Config} */
export default {
    // prefix: "tw-",
    mode: 'jit',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            screens: {
                '2xl': '1536px', // Kích thước màn hình 2xl
            },
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
};
