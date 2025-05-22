/** @type {import('tailwindcss').Config} */
export default {
   // prefix: "tw-",
   mode: 'jit',
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         screens: {
            '2xl': '1875px', // Kích thước màn hình 2xl
         },
         colors: {
            // Main
            'main-bg-color-color': '#f4f5f6',
            'main-color': '#212631',

            // Sidebar
            'icon-sidebar': '#6b7280',
            'icon-sidebar-active': '#ffffff',
            'text-sidebar': '#7d8da1',
            'text-sidebar-active': '#ffffff',
            'bg-sidebar-hover': '#eff6ff',

            // Header
            'icon-header': '#000000',
            'bg-icon-header': '#d6d9dd',
         },
         width: {
            // Navbar
            navbar: '250px',
         },
         height: {
            // Header
            header: '70px',
         },

         maxHeight: {
            'popover-message': '300px',
            'popover-notification': '350px',
         },
      },
   },

   plugins: [require('tailwind-scrollbar-hide')],
}
