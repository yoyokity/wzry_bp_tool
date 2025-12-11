import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
    base: '/wzry_bp_tool/',
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            // 1. 匹配所有以 '/api' 开头的请求
            '/api': {
                // 2. 将请求转发到目标服务器
                target: 'https://pvp.mcxssg.net',
                // 3. 改变请求头中的 Origin，使其看起来像是从目标服务器发出的
                changeOrigin: true,

                // 5. 目标是 HTTPS，通常需要这个
                secure: true
            }
        }
    }
})
