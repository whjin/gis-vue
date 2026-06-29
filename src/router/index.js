import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/BasicLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页概览', icon: 'home', keepAlive: false },
      },
      {
        path: 'gis-map',
        name: 'GisMap',
        component: () => import('@/views/gis/MapView.vue'),
        meta: { title: '地图中心', icon: 'map', keepAlive: true },
      },
      {
        path: 'data-manage',
        name: 'DataManage',
        component: () => import('@/views/DataManage.vue'),
        meta: { title: '数据管理', icon: 'database', keepAlive: false },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '页面不存在' },
  },
];

const router = createRouter({
  history: createWebHistory('/gis-vue/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - GIS-VUE`;
  }
});

export default router;
