import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
	base: "/blamo/",
	build: {
		outDir: "docs",
	},
	plugins: [svelte()],
});
