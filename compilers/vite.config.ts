'use strict';

import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	envDir: './env',
	plugins: [tsconfigPaths()],
	build: {
		target: 'esnext',
		rollupOptions: {
			input: {
				'hero-block': path.resolve(__dirname, '../assets/src/tsx/blocks/hero-block/index.tsx'),
			},
			output: [
				{
					dir: path.resolve(__dirname, '../assets/dist/jsx'),
					format: 'esm',
					entryFileNames: '[name].min.js',
				}
			],
		}
	},
	esbuild: {
		legalComments: 'none',
		minifyIdentifiers: false,
		minifySyntax: true,
		minifyWhitespace: true,
	},
});
