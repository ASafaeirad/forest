import type { PresetMiniTheme } from 'unocss';

import {
  defineConfig,
  presetMini,
  presetWebFonts,
  transformerVariantGroup,
} from 'unocss';

/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments */
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
    ['h-screen', { height: '100dvh' }],
    [
      'bg-noise',
      { 'background': 'url("/noise.png") repeat', 'background-size': '600px' },
    ],
    [
      'toggle-gradient-shadow',
      {
        background:
          'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 25%, rgba(28, 28, 28) 25%, rgba(28, 28, 28) 100%)',
      },
    ],
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
          '0 0 20px 4px rgba(255 80 0 / 80%), inset 0 1px rgb(28 28 28 / 30%)',
      },
    ],
    [
      'toggle-gradient-off',
      {
        'box-shadow':
          '0 1px 1px rgb(255 255 255 / 10%), inset 0 1px rgb(0 0 0 / 40%)',
      },
    ],
    [
      'timer-border',
      {
        'background-image': `url("data:image/svg+xml,%3Csvg%20width%3D%22100%25%22%20height%3D%22100%25%22%20viewBox%3D%220%200%20310%20310%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Crect%20x%3D%225%22%20y%3D%225%22%20width%3D%22300%22%20height%3D%22300%22%20rx%3D%22150%22%20stroke%3D%22black%22%20stroke-opacity%3D%220.1%22%0A%20%20%20%20stroke-width%3D%229%22%20stroke-dasharray%3D%223%203%22%20%2F%3E%0A%3C%2Fsvg%3E%0A")`,
      },
    ],
  ],
  theme: {
    colors: {
      interface: '#373132',
      bg: '#BFC2AF',
      marker: '#AB4640',
      fg: {
        DEFAULT: 'rgb(0 0 0 / 70%)',
        inverse: '#FFFFFF',
      },
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
      /* eslint-disable @typescript-eslint/restrict-template-expressions */
      getCSS: ({ theme }) => `
        html {
          background-color: ${theme.colors?.bg};
        }
      `,
    },
  ],
});
