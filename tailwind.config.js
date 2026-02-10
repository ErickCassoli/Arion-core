export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#0f1115', // Atlas Dark Base
          secondary: '#16191f', // Sidebar/Cards
          tertiary: '#1e2229', // Inputs/Hovers
          'dark-purple': '#0f0518', // Deep Purple Background
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.15)',
          purple: 'rgba(124, 58, 237, 0.2)', // Purple border
        },
        accent: {
          DEFAULT: '#6366f1', // Indigo-500
          hover: '#4f46e5',
          glow: 'rgba(99, 102, 241, 0.15)',
          purple: '#7c3aed', // Violet-600
          'purple-glow': 'rgba(124, 58, 237, 0.25)',
        },
        success: '#10b981',
        warning: '#f59e0b', 
        error: '#ef4444',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
