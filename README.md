## 部署

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

## 基础配置

`public`文件夹增加 `404.html`

`BASE_URL` 配置

```js
// .env.production
VUE_APP_BASE_URL = /gis-vue/;
```

## 路由配置

```js
history: createWebHistory(import.meta.env.BASE_URL),
```
