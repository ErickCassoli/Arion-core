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
          DEFAULT: '#0a0a0f', // Void Black
          secondary: '#13131f', // Glassmorphism Surface
          tertiary: '#1c1c2e', // Lighter Surface
          'dark-purple': '#0f0518',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.15)',
          purple: 'rgba(139, 92, 246, 0.3)', // Violet-500 optimized
        },
        accent: {
          DEFAULT: '#8b5cf6', // Neon Purple
          hover: '#7c3aed',
          glow: 'rgba(139, 92, 246, 0.5)',
          green: '#10b981', // Neon Green
          'green-glow': 'rgba(16, 185, 129, 0.5)',
        },
        status: {
          thinking: '#3b82f6', // Blue Pulse
          executing: '#10b981', // Green Solid
          error: '#ef4444', // Red Flash
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
