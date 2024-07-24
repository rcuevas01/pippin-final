/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./src/**/*.{js,jsx,ts,tsx}",
	  // ... any other content paths you're using
	],
	theme: {
	  extend: {
		colors: {
		  'custom-gold': '#3d3522',
		  'custom-black': '#1a1a1a',
		},
		gradientColorStops: theme => ({
		  ...theme('colors'),
		  'custom-gold': '#3d3522',
		  'custom-black': '#1a1a1a',
		}),
		backgroundImage: {
		  'event-gradient': 'linear-gradient(to top, var(--tw-gradient-stops))',
		},
	  },
	},
	plugins: [],
  }