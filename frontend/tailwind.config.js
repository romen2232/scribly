const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
export default {
    content: [
        './src/**/*.{html,js,jsx,ts,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: ['bg-red-400', 'bg-green-400'],
    theme: {
        extend: {
            boxShadow: {
                'inner-lg': 'inset 0 -6px 0 0 rgba(0, 0, 0, 0.06)',
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
        },
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
            tiviElectricPurple: {
                50: '#F3D6FF',
                100: '#D286FE',
            },
            tiviPhlox: '#DD0CFC',
            ...colors,
        },
    },
    darkMode: 'class',
    plugins: [nextui()],
};
