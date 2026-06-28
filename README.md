## 部署方式1

```js
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/gis-vue/' : './',
    resolve: {
      alias: {
        '@': './src',
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      emptyOutDir: true,
      outDir: 'dist',
    },
  };
});
```

```sh
npm install gh-pages -D

npm run build
npm run deploy
```
