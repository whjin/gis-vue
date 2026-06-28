import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './styles/style.css';
import './assets/iconfont/iconfont.css'
import Icon from './components/Icon.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('Icon', Icon);

app.mount('#app');
