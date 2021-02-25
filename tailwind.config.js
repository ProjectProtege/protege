module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
    extend: {
      fontFamily: {
        sans: [
          'Nunito',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
        ],
      },
      ringWidth: {
        DEFAULT: '2px',
      },
      ringColor: {
        teal: '#70d2b2',
      },
      colors: {
        transparent: 'transparent',

        black: '#000',
        white: '#fff',

        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        teal: {
          100: '#a9e4d1',
          200: '#9be0c9',
          300: '#9EE0CA',
          400: '#7ed7ba',
          500: '#70d2b2',
          600: '#65bda0',
          700: '#5aa88e',
          800: '#4e937d',
          900: '#437e6b',
        },
        blue: {
          100: '#d6d8df',
          200: '#c2c5cf',
          300: '#adb1bf',
          400: '#999eaf',
          500: '#55556D',
          600: '#70778f',
          700: '#5b637f',
          800: '#47506f',
          900: '#323c5f',
        },
        error: {
          full: '#E53E3E',
          50: '#f3d3d3',
        },
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '10xl': '10rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
