/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}',
  "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {  
		aspectRatio: {
        '2/3': '2 / 3',
		'3/5': '3 / 5',
		'4/5': '4 / 5',
      },
	width:{
		'7/10' : "70%",
	}},
  },
  plugins: [ require('flowbite/plugin')],
}
