import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: '#00ffff',
          magenta: '#ff00ff',
          green: '#00ff41',
          purple: '#9d00ff',
          blue: '#0080ff',
          dark: '#0a0a0f',
          darker: '#050508',
          gray: '#1a1a24',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'cyber-glow': '0 0 20px rgba(0, 255, 255, 0.5)',
        'cyber-glow-magenta': '0 0 20px rgba(255, 0, 255, 0.5)',
        'cyber-glow-green': '0 0 20px rgba(0, 255, 65, 0.5)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'float': 'float 15s ease-in-out infinite',
        'float-delayed': 'float 18s ease-in-out infinite 2s',
        'float-slow': 'float 22s ease-in-out infinite 1s',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'float': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
