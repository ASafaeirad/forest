import React from '@vitejs/plugin-react-swc';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import Svgr from 'vite-plugin-svgr';
import TsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [React(), UnoCSS(), Svgr(), TsConfigPaths()],
  build: {
    target: ['chrome134'],
  },
});
