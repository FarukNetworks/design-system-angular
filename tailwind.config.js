/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.ts'],
  theme: {
    extend: {
      colors: {
        // Black and White
        black: {
          DEFAULT: 'var(--color-black)',
          60: 'var(--color-black-60)',
          40: 'var(--color-black-40)',
        },
        white: {
          DEFAULT: 'var(--color-white)',
          80: 'var(--color-white-80)',
          40: 'var(--color-white-40)',
          20: 'var(--color-white-20)',
          10: 'var(--color-white-10)',
        },

        // Grey Scale
        grey: {
          1: 'var(--color-grey-1)',
          '1-10': 'var(--color-grey-1-10)',
          2: 'var(--color-grey-2)',
          3: 'var(--color-grey-3)',
          4: 'var(--color-grey-4)',
          5: 'var(--color-grey-5)',
          6: 'var(--color-grey-6)',
          7: 'var(--color-grey-7)',
          8: 'var(--color-grey-8)',
          9: 'var(--color-grey-9)',
          10: 'var(--color-grey-10)',
        },

        // Navy
        navy: {
          1: 'var(--color-navy-1)',
          '1-10': 'var(--color-navy-1-10)',
          '1-5': 'var(--color-navy-1-5)',
          2: 'var(--color-navy-2)',
          3: 'var(--color-navy-3)',
          4: 'var(--color-navy-4)',
          5: 'var(--color-navy-5)',
        },

        // Gradient Colors
        gradient: {
          1: 'var(--color-gradient-1)',
          2: 'var(--color-gradient-2)',
        },

        // Blue
        blue: {
          1: 'var(--color-blue-1)',
          2: 'var(--color-blue-2)',
          3: 'var(--color-blue-3)',
          '3-10': 'var(--color-blue-3-10)',
        },

        // Green
        green: {
          1: 'var(--color-green-1)',
          2: 'var(--color-green-2)',
          3: 'var(--color-green-3)',
          4: 'var(--color-green-4)',
          5: 'var(--color-green-5)',
        },

        // Red
        red: {
          1: 'var(--color-red-1)',
          2: 'var(--color-red-2)',
        },

        // Orange
        orange: {
          1: 'var(--color-orange-1)',
          2: 'var(--color-orange-2)',
          3: 'var(--color-orange-3)',
          4: 'var(--color-orange-4)',
          5: 'var(--color-orange-5)',
        },
      },

      // Typography
      fontFamily: {
        'primary': 'var(--font-family-primary)',
        'sans': 'var(--font-family-primary)',
      },

      fontSize: {
        '10': 'var(--font-size-10)',
        '12': 'var(--font-size-12)',
        '14': 'var(--font-size-14)',
        '16': 'var(--font-size-16)',
        '20': 'var(--font-size-20)',
        '22': 'var(--font-size-22)',
        '24': 'var(--font-size-24)',
      },

      fontWeight: {
        'regular': 'var(--font-weight-regular)',
        'semibold': 'var(--font-weight-semibold)',
        'bold': 'var(--font-weight-bold)',
      },

      lineHeight: {
        'tight': 'var(--line-height-tight)',
        'normal': 'var(--line-height-normal)',
        'relaxed': 'var(--line-height-relaxed)',
      },
    },
  },
  plugins: [],
}
