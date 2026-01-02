import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkblue: {
          100: "#1e4a8a1a",
          200: "#1e4a8a4d",
          300: "#1e4a8a80",
          400: "#1e4a8ab3", 
          500: "#1e4a8ae6", 
          600: "#1e4a8a99", 
        },
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
      },
      animation: {
        slideDown: "slideDown 0.3s ease-out",
        slideUp: "slideUp 0.3s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
        fadeOut: "fadeOut 0.3s ease-out",
        modalSlideIn: "modalSlideIn 0.3s ease-out",
        modalSlideOut: "modalSlideOut 0.3s ease-out",
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        slideDown: {
          from: {
            opacity: "0",
            transform: "translateX(-50%) translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(-50%) translateY(0)",
          },
        },
        slideUp: {
          from: {
            opacity: "1",
            transform: "translateX(-50%) translateY(0)",
          },
          to: {
            opacity: "0",
            transform: "translateX(-50%) translateY(-10px)",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        fadeOut: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0",
          },
        },
        modalSlideIn: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -50%) scale(0.9)",
          },
          to: {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
        modalSlideOut: {
          from: {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
          to: {
            opacity: "0",
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
      },
      maxHeight: {
        "45": "11.25rem",
      },
      spacing: {
        "4.5": "1.125rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
} satisfies Config;
