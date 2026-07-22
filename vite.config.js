import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        react(),
        {
            // Defer built CSS so it does not block first paint; body bg is set inline in index.html
            name: 'defer-stylesheet',
            transformIndexHtml(html) {
                return html.replace(
                    /<link rel="stylesheet"([^>]*href="[^"]+\.css"[^>]*)>/g,
                    '<link rel="stylesheet"$1 media="print" onload="this.media=\'all\'"><noscript><link rel="stylesheet"$1></noscript>'
                )
            },
        },
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // Split the swiper plugin library into a separate chunk to avoid a large chunk size on index.js
                        if (id.includes('swiper')) return 'swiper'
                        return
                    }
                },
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                quietDeps: true,
                silenceDeprecations: [
                    'color-functions',
                    'global-builtin',
                    'import',
                    'legacy-js-api',
                ],
            },
        },
    },
})
