/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2BD17E',
        error: '#EB5757',
        background: '#093545',
        input: '#224957',
        card: '#092C39',
      },
      spacing: {
        2: '2px',
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
        32: '32px',
      },
      maxWidth: {
        container: '1440px',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        h1: ['64px', '80px'],
        h2: ['48px', '56px'],
        h3: ['32px', '40px'],
        h4: ['24px', '32px'],
        h5: ['20px', '24px'],
        h6: ['16px', '24px'],
        bodyLg: ['20px', '32px'],
        bodyRg: ['16px', '24px'],
        bodySm: ['14px', '24px'],
        bodyXs: ['12px', '24px'],
        caption: ['14px', '16px'],
      },
    },
  },
  plugins: [],
};
