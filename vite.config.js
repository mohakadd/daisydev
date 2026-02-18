import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    root: '.',
    server: {
        host: true
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                candidate: resolve(__dirname, 'candidate.html'),
                contact: resolve(__dirname, 'contact.html'),
                join: resolve(__dirname, 'nous-rejoindre.html'),
                donate: resolve(__dirname, 'faire-un-don.html'),
                team: resolve(__dirname, 'notre-equipe.html'),
                thanks: resolve(__dirname, 'merci.html'),
                legal: resolve(__dirname, 'mentions-legales.html'),
            },
        },
    },
})
