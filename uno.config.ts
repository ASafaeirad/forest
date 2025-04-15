import type { PresetMiniTheme } from 'unocss';

import {
  defineConfig,
  presetMini,
  presetWebFonts,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig<PresetMiniTheme>({
  presets: [
    presetMini(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Inter:400,700'],
        mono: ['Space Mono:400,700'],
      },
    }),
  ],
  transformers: [transformerVariantGroup()],
  rules: [
    [
      'toggle-shadow',
      {
        'box-shadow': [
          '0 20px 40px 5px rgb(0 0 0 / 15%)',
          '0 15px 20px rgb(0 0 0 / 25%)',
          '0 10px 15px rgb(0 0 0 / 25%)',
          '0 5px 5px rgb(0 0 0 / 30%)',
          '0 2px 2px rgb(0 0 0 / 30%)',
        ].join(','),
      },
    ],
    [
      'toggle-shadow-sm',
      {
        'box-shadow': [
          '0 15px 20px 4px rgb(0 0 0 / 15%)',
          '0 10px 15px rgb(0 0 0 / 25%)',
          '0 5px 5px rgb(0 0 0 / 30%)',
          '0 2px 2px rgb(0 0 0 / 30%)',
        ].join(','),
      },
    ],
    [
      'toggle-shadow-inset',
      {
        'box-shadow':
          'inset 0 2px 1px rgb(255 255 255 / 30%), inset 0 -2px 1px rgb(28 28 28)',
      },
    ],
    ['filter-brighter', { filter: 'brightness(1.2)' }],
    [
      'toggle-gradient-on',
      {
        'background':
          'radial-gradient(at center, rgba(255 131 0) 25%, rgba(255 0 0))',
        'box-shadow':
          '0 0 20px 4px rgba(255 80 0 / 80%), inset 0 -1px rgb(255 255 255 / 20%), inset 0 1px rgb(28 28 28 / 90%)',
      },
    ],
    [
      'toggle-gradient-off',
      {
        'box-shadow':
          'inset 0 -1px rgb(255 255 255 / 20%), inset 0 1px rgb(28 28 28)',
      },
    ],
  ],
  theme: {
    colors: {
      interface: '#373132',
      bg: '#BFC2AF',
      fg: '#FFFFFF',
      toggle: {
        off: 'rgb(0 0 0 / 50%)',
      },
    },
    easing: {
      cubic: 'cubic-bezier(0,1.5,.8,1.8)',
    },
  },
  preflights: [
    {
      getCSS: ({ theme }) => `
        html {
          background-color: ${theme.colors?.bg};
        }
      `,
    },
  ],
});
