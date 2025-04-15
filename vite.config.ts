import React from '@vitejs/plugin-react-swc';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import Svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [React(), UnoCSS(), Svgr()],
});
