/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
export default {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            tiviBlack: '#070D0E',
            tiviWhite: '#F5F4F6',
            tiviCeladon: '#A8DCA8',
            tiviPistachio: '#85CD85',
            tiviAsparagus: '#609765',
            tiviGreen: '#2a5046',
            tiviDarkGreen: '#20302D',
            tiviViolet: '#33054C',
            tiviIndigo: '#4A0175',
            tiviElectricViolet: '#B601FD',
            tiviPhlox: '#DD0CFC',
            ...colors,
        },
    },
    plugins: [],
};
