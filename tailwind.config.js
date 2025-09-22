/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Main theme colors
                background: '#0a0a0a',
                text: '#f8f8f8',

                // Keep some existing accent colors that might be needed
                accent: {
                    gold: '#f8f8f8',
                    light: '#c1d5e9',
                },
            },
        },
    },
    plugins: [],
}
