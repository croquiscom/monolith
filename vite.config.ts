import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import type { ViteUserConfig } from 'vitest/config';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

const vitestConfig: ViteUserConfig = {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
  },
};

// configs 폴더 복사 플러그인
const copyConfigsPlugin = () => {
  return {
    name: 'copy-configs',
    writeBundle() {
      const configsDir = resolve(__dirname, 'src/configs');
      const distConfigsDir = resolve(__dirname, 'dist/configs');

      // dist/configs 폴더 생성
      if (!existsSync(distConfigsDir)) {
        mkdirSync(distConfigsDir, { recursive: true });
      }

      // JSON 파일들 복사
      const files = ['.base.eslintrc.json', '.next.eslintrc.json', '.nx.eslintrc.json', '.prettierrc.json'];

      files.forEach((file) => {
        const srcPath = resolve(configsDir, file);
        const destPath = resolve(distConfigsDir, file);

        if (existsSync(srcPath)) {
          copyFileSync(srcPath, destPath);
          console.log(`Copied: ${file} to dist/configs/`);
        }
      });
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    copyConfigsPlugin(),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    target: 'esnext',
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'React',
        },
      },
    },
  },
  ...vitestConfig,
});
