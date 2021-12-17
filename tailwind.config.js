const colors = require('tailwindcss/colors')

module.exports = {
	purge: {
		preserveHtmlElements: true,
		content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
	},
	theme: {
		extend: {
			colors: {
				teal: colors.teal,
			},
		},
	},
	plugins: [],
}
