import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"
import { PluginUtils } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: ({ theme }: PluginUtils) => ({
        zinc400: {
          css: {
            '--tw-prose-body': theme('colors.zinc[400]'),
            '--tw-prose-headings': theme('colors.zinc[400]'),
            '--tw-prose-bold': theme('colors.zinc[400]'),
            '--tw-prose-links': theme('colors.zinc[400]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.stone[400]'),
            '--tw-prose-pre-bg': theme('colors.stone[900]'),
          }
        }
      }),
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    typography
  ],
};
export default config;
