/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['InriaSans', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#4ec39e", // green
        secondary: "#0073b9", // blue
      },
      backgroundImage: {
        "hero-home": "url('/assets/home/hero.png')",
        "hero-about": "url('/assets/about/hero.png')",
        "hero-credentialing": "url('/assets/credentialing/hero.png')",

        "software1":"url('/assets/home/Group 7.png')",
        "software2":"url('/assets/home/Group 14.png')",
        "software3":"url('/assets/home/Group 15.png')",
        "software4":"url('/assets/home/Group 16.png')",
        "software5":"url('/assets/home/Group 17.png')",
        "clients":"url('/assets/home/Group 18.png')",
        
        "about-2": "url('/assets/about/about-2.png')",
      },

    },
  },
  plugins: [],
};
