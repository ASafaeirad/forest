import presetMini from '@unocss/preset-mini';
import presetWebFonts from '@unocss/preset-web-fonts';
import { defineConfig } from 'unocss';

export default defineConfig({
  presets: [
    presetMini(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Space Grotesk:400,700'],
        mono: ['Space Mono:400,700'],
      },
    }),
  ],
  theme: {
    colors: {
      neutral: {
        100: 'oklch(0.92 0 0)',
        200: 'oklch(0.85 0 0)',
        300: 'oklch(0.79 0 0)',
        400: 'oklch(0.72 0 0)',
        500: 'oklch(0.66 0 0)',
        600: 'oklch(0.6 0 0)',
        700: 'oklch(0.53 0 0)',
        800: 'oklch(0.47 0 0)',
        900: 'oklch(0.4 0 0)',
      },
      fg: {
        DEFAULT: 'oklch(0.4 0 0)',
      },
      background: {
        DEFAULT: 'oklch(0.98 0 0)',
      },
      primary: {
        DEFAULT: 'oklch(0.53 0.14 149.74)',
        hover: 'oklch(0.53 0.14 149.74 / 0.8)',
        active: 'oklch(0.53 0.14 149.74 / 0.6)',
        disabled: 'oklch(0.53 0.14 149.74 / 0.4)',
      },
      error: {
        DEFAULT: 'oklch(0.5 0.19 25.1)',
        hover: 'oklch(0.5 0.19 25.1 / 0.8)',
        active: 'oklch(0.5 0.19 25.1 / 0.6)',
        disabled: 'oklch(0.5 0.19 25.1 / 0.4)',
      },
      success: {
        DEFAULT: 'oklch(0.53 0.14 149.74)',
        hover: 'oklch(0.53 0.14 149.74 / 0.8)',
        active: 'oklch(0.53 0.14 149.74 / 0.6)',
        disabled: 'oklch(0.53 0.14 149.74 / 0.4)',
      },
      warning: {
        DEFAULT: 'oklch(0.69 0.14 70.73)',
        hover: 'oklch(0.69 0.14 70.73 / 0.8)',
        active: 'oklch(0.69 0.14 70.73 / 0.6)',
        disabled: 'oklch(0.69 0.14 70.73 / 0.4)',
      },
    },
    borderColor: {
      DEFAULT: 'oklch(0.79 0 0)',
      neutral: 'oklch(0.79 0 0)',
      error: 'oklch(0.5 0.19 25.1)',
    },
  },
  preflights: [
    {
      getCSS: ({ theme }) => `
        html {
          background-color: ${theme.colors.background.DEFAULT};
          color: ${theme.colors.fg.DEFAULT};
        }
      `,
    },
  ],
});
