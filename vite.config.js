import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // Configuración de build
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
    server: {
        port: 5173,
        strictPort: true,
        // Permite que Vite sirva archivos desde fuera de la raíz si es necesario
        // Aunque aquí todo está bajo la raíz del portafolio.
        fs: {
            allow: ['..'],
        },
    },
    // Base path por defecto es '/'
    base: '/',
});
