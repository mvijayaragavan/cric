/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cricket: {
                    pitch: '#d3c19e',
                    grass: '#2b7a4b',
                    leather: '#d0303b',
                    dark: '#1a1a2e',
                    accent: '#47adb8'
                }
            }
        },
    },
    plugins: [],
}
