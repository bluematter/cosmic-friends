import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Cosmic primary - vibrant purple/violet
        cosmic: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        // Accent - electric cyan/teal
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        // Energy - vibrant pink/magenta for highlights
        energy: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        // Background colors - deep space dark
        background: {
          DEFAULT: '#0a0a0f',
          secondary: '#12121a',
          tertiary: '#1a1a24',
          elevated: '#22222e',
          hover: 'rgba(255, 255, 255, 0.05)',
        },
        // Text colors
        text: {
          primary: '#ffffff',
          secondary: '#a1a1aa',
          tertiary: '#71717a',
          muted: '#52525b',
        },
        // Border colors
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          subtle: 'rgba(255, 255, 255, 0.05)',
          strong: 'rgba(255, 255, 255, 0.2)',
        },
        // Status colors
        success: {
          DEFAULT: '#10b981',
          muted: 'rgba(16, 185, 129, 0.1)',
        },
        warning: {
          DEFAULT: '#f59e0b',
          muted: 'rgba(245, 158, 11, 0.1)',
        },
        error: {
          DEFAULT: '#ef4444',
          muted: 'rgba(239, 68, 68, 0.1)',
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 50%, #06b6d4 100%)',
        'cosmic-gradient-subtle': 'linear-gradient(135deg, rgba(109, 40, 217, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(6, 182, 212, 0.1) 100%)',
        'radial-glow': 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(139, 92, 246, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(6, 182, 212, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(217, 70, 239, 0.2) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(139, 92, 246, 0.3)',
        'glow-md': '0 0 40px -10px rgba(139, 92, 246, 0.4)',
        'glow-lg': '0 0 60px -15px rgba(139, 92, 246, 0.5)',
        'glow-accent': '0 0 40px -10px rgba(6, 182, 212, 0.4)',
        'glow-energy': '0 0 40px -10px rgba(217, 70, 239, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient': 'gradient 8s ease infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
