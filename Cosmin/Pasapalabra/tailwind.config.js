import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    important: true,
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'royal-blue': '#00bbf0'
            },
            backgroundImage: {
                'pasapalabraImage': "url('/storage/images/fondo5.jpg')",
                'preguntasImage': "url('/storage/images/fondo6.jpg')",
                'partidasImage': "url('/storage/images/fondo8.jpg')",
                'categoriasImage': "url('/storage/images/fondo3.jpg')",
            },
        },
    },

    plugins: [forms],
};
