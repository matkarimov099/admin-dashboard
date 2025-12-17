import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	base: '/',
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		port: 3000,
		host: true,
		open: true,
	},
	build: {
		minify: 'esbuild',
		target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
		cssCodeSplit: true,
		cssMinify: true,
		chunkSizeWarningLimit: 2000,
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks: {
					// Group all React-related code together
					'vendor-react': ['react', 'react-dom', 'react-router'],
					// Group all UI libraries together
					'vendor-ui': [
						'@radix-ui/react-avatar',
						'@radix-ui/react-checkbox',
						'@radix-ui/react-dialog',
						'@radix-ui/react-dropdown-menu',
						'@radix-ui/react-label',
						'@radix-ui/react-select',
						'@radix-ui/react-separator',
						'@radix-ui/react-slot',
						'@radix-ui/react-tooltip',
						'@radix-ui/react-popover',
						'@radix-ui/react-collapsible',
						'@radix-ui/react-scroll-area',
					],
					// Group data management libraries
					'vendor-data': ['@tanstack/react-table', '@tanstack/react-query'],
					// Group form libraries
					'vendor-forms': ['react-hook-form', 'zod', '@hookform/resolvers'],
					// Group utility libraries
					'vendor-utils': [
						'clsx',
						'tailwind-merge',
						'class-variance-authority',
						'date-fns',
						'axios',
						'lucide-react',
					],
				},
				chunkFileNames: 'assets/js/[name]-[hash].js',
				entryFileNames: 'assets/js/[name]-[hash].js',
				assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
			},
		},
	},
	optimizeDeps: {
		include: [
			'react',
			'react-dom',
			'react-router',
			'@tanstack/react-table',
			'@tanstack/react-query',
		],
	},
});
