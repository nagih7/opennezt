/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    // prefix: "tw-",
   mode: 'jit',
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
   	extend: {
   		screens: {
   			'2xl': '1875px',
   			'3xl': '2000px'
   		},
   		colors: {
   			'main-bg-color-color': '#f4f5f6',
   			'main-color': '#2b62d9',
   			'icon-sidebar': '#6b7280',
   			'icon-sidebar-active': '#ffffff',
   			'text-sidebar': '#7d8da1',
   			'text-sidebar-active': '#ffffff',
   			'bg-sidebar-hover': '#eff6ff',
   			'icon-header': '#000000',
   			'bg-icon-header': '#d6d9dd',
   			background: 'hsl(var(--background))',
   			foreground: 'hsl(var(--foreground))',
   			card: {
   				DEFAULT: 'hsl(var(--card))',
   				foreground: 'hsl(var(--card-foreground))'
   			},
   			popover: {
   				DEFAULT: 'hsl(var(--popover))',
   				foreground: 'hsl(var(--popover-foreground))'
   			},
   			primary: {
   				DEFAULT: 'hsl(var(--primary))',
   				foreground: 'hsl(var(--primary-foreground))'
   			},
   			secondary: {
   				DEFAULT: 'hsl(var(--secondary))',
   				foreground: 'hsl(var(--secondary-foreground))'
   			},
   			muted: {
   				DEFAULT: 'hsl(var(--muted))',
   				foreground: 'hsl(var(--muted-foreground))'
   			},
   			accent: {
   				DEFAULT: 'hsl(var(--accent))',
   				foreground: 'hsl(var(--accent-foreground))'
   			},
   			destructive: {
   				DEFAULT: 'hsl(var(--destructive))',
   				foreground: 'hsl(var(--destructive-foreground))'
   			},
   			border: 'hsl(var(--border))',
   			input: 'hsl(var(--input))',
   			ring: 'hsl(var(--ring))',
   			chart: {
   				'1': 'hsl(var(--chart-1))',
   				'2': 'hsl(var(--chart-2))',
   				'3': 'hsl(var(--chart-3))',
   				'4': 'hsl(var(--chart-4))',
   				'5': 'hsl(var(--chart-5))'
   			}
   		},
   		width: {
   			navbar: '250px'
   		},
   		height: {
   			header: '70px'
   		},
   		maxHeight: {
   			'popover-message': '300px',
   			'popover-notification': '350px'
   		},
   		borderRadius: {
   			lg: 'var(--radius)',
   			md: 'calc(var(--radius) - 2px)',
   			sm: 'calc(var(--radius) - 4px)'
   		}
   	}
   },

   plugins: [require('tailwind-scrollbar-hide'), require("tailwindcss-animate")],
}
