/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        section: "var(--section)",
        inactive: "var(--inactive)",
        tabIndicator: "var(--tabIndicator)",
        subtitle: "var(--subtitle)",
        danger: "var(--danger)",
        skeleton: "var(--skeleton)",
      },
      spacing: {
        st: "var(--safe-top)",
        sb: "var(--safe-bottom)",
      },
      fontSize: {
        "4xs": ["10px", "14px"],
        "3xs": ["11px", "16px"],
        "2xs": ["12px", "16px"],
        xs: ["13px", "18px"],
        sm: ["14px", "18px"],
        base: ["15px", "20px"],
        lg: ["16px", "22px"],
        xl: ["18px", "24px"],
      },
    },
  },
    plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none"
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none"
        }
      });
    }
  ]
};
