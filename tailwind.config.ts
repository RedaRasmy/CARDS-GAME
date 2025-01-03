import type { Config } from "tailwindcss";
import daisyui from "daisyui"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'card-back': "url('/images/cardback.png')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
      },
      // gridTemplateColumns :{
      //   'game-cols':'',
      // }
    },
  },
  plugins: [
    daisyui,
  ],
};
export default config;


