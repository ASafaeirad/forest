import { defineConfig } from '@fullstacksjs/eslint-config';
import unocss from '@unocss/eslint-config/flat';

export default defineConfig(
  {
    typescript: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
  unocss,
);
