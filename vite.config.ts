import { ConfigEnv, defineConfig, UserConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vite.dev/config/
export default defineConfig((env: ConfigEnv): UserConfig => {
  return {
    root: './',
    base: "./",
    publicDir: './public',
    plugins: [react(), tailwindcss()],
    server: {
      port: 3000,
    },
    resolve: {
      extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        '@framework': path.resolve(__dirname, './src/live2d/Framework/src'),
      },
    },
    build: {
      target: 'modules',
      assetsDir: 'assets',
      outDir: './dist',
      sourcemap: env.mode == 'development' ? true : false,
    }
  }
})