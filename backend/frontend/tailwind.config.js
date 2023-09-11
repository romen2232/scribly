import { nextui } from '@nextui-org/react';
/** @type {import('tailwindcss').Config} */
import colors, { pink } from 'tailwindcss/colors';
export default {
    content: [
        './src/**/*.{html,js,jsx,ts,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        'bg-red-400',
        'bg-green-400',
        'bg-sky-400',
        'bg-tiviElectricPurple-50',
        'bg-tiviElectricPurple-100',
    ],
    theme: {
        extend: {
            boxShadow: {
                'inner-dark': 'inset 0 -6px 0 0 rgba(0, 0, 0, 0.06)',
                'inner-light': 'inset 0 -6px 0 0 rgba(255, 255, 255, 0.06)',
                'none-important': '0 0 #0000 !important',
            },

            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateY(-100%)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                },
                slideOut: {
                    '0%': { transform: 'translateY(0)', opacity: 1 },
                    '100%': { transform: 'translateY(-100%)', opacity: 0 },
                },
            },
            animation: {
                slideIn: 'slideIn 0.5s forwards',
                slideOut: 'slideOut 0.5s forwards',
            },
            fontFamily: {
                casualHandy: ['HandyCasualCondensed', 'sans-serif'],
            },
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',

            tiviElectricViolet: '#B601FD',
            tiviElectricPurple: {
                50: '#F3D6FF',
                100: '#D286FE',
            },
            tiviPhlox: '#DD0CFC',
            ...colors,
            mainBackground: {
                50: '#ffffff',
                100: '#fffefb',
                200: '#fffdf6',
                300: '#d9d7d1',
                400: '#b3b1ad',
                500: '#8d8c88',
                600: '#666663',
                700: '#40403f',
                800: '#1a1a1a',
                900: '#0d0d0d',
                950: '#000000',
            },
            primaryPink: {
                50: '#f1b4c8',
                100: '#eea4bc',
                200: '#eb95b1',
                300: '#e886a6',
                400: '#e5779b',
                500: '#e26890',
                600: '#cb5e82',
                700: '#b55373',
                800: '#9e4965',
                900: '#883e56',
                950: '#713448',
            },
            primaryBlue: {
                50: '#a5cdce',
                100: '#93c3c4',
                200: '#81b9ba',
                300: '#6fafb1',
                400: '#5da5a7',
                500: '#4b9b9d',
                600: '#448c8d',
                700: '#3c7c7e',
                800: '#356d6e',
                900: '#2d5d5e',
                950: '#264e4f',
            },
            secondaryYellow: {
                50: '#F9DE95',
                100: '#F7D77F',
                200: '#F6D06A',
                300: '#F5C955',
                400: '#F3C33F',
                500: '#F2BC2A',
                600: '#DAA926',
                700: '#C29622',
                800: '#A9841D',
                900: '#917119',
                950: '#795E15',
            },
        },
    },
    darkMode: 'class',
    plugins: [nextui()],
};
