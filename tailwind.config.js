/** @type {import('tailwindcss').Config} */
export default {
     darkMode: "class",
     content: ["./src/**/*.{html,js,svelte,ts}"],
     theme: {
          extend: {
               fontFamily: {
                    spartan: ["League Spartan", "sans-serif"],
               },
          },
     },
     plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("@tailwindcss/aspect-ratio"), require("@tailwindcss/line-clamp")],
};
