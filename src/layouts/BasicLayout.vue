<template>
  <div class="basic-layout">
    <aside class="sidebar" :class="{ collapsed: isCollapsed }">
      <div class="logo-area">
        <span v-if="!isCollapsed" class="logo-text">GIS-VUE</span>
        <span v-else class="logo-text">GIS</span>
      </div>

      <nav class="menu-list">
        <router-link v-for="item in menuList" :key="item.path" :to="item.path" class="menu-item" active-class="menu-active">
          <span class="menu-icon">{{ item.meta.icon }}</span>
          <span v-if="!isCollapsed" class="menu-label">{{ item.meta.title }}</span>
        </router-link>
      </nav>
    </aside>

    <div class="main-wrapper">
      <header class="header">
        <div class="collapse-btn" :title="isCollapsed ? '展开' : '收起'" @click="isCollapsed = !isCollapsed">
          <Icon :name="isCollapsed ? 'expand' : 'contract'" :size="24" />
        </div>
        <div class="header-right">
          <span class="user-info">管理员</span>
        </div>
      </header>

      <main class="page-content">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <keep-alive :include="cachedViews">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isCollapsed = ref(false);

const menuList = [
  { path: '/home', meta: { title: '首页概览', icon: '🏠' } },
  { path: '/gis-map', meta: { title: '地图中心', icon: '🗺️' } },
  { path: '/data-manage', meta: { title: '数据管理', icon: '🗄️' } },
];

const cachedViews = computed(() => {
  return route.matched.filter(item => item.meta.keepAlive).map(item => item.name);
});
</script>

<style lang="scss" scoped>
.basic-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .sidebar {
    width: 220px;
    flex-shrink: 0;
    background: #1f2937;
    color: #fff;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;
    .logo-area {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid #374151;
    }
  }
  .collapsed {
    width: 64px;
  }

  .menu-list {
    flex: 1;
    padding: 12px 0;
    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      height: 48px;
      padding: 0 20px;
      color: #d1d5db;
      text-decoration: none;
      transition: all 0.2s;
    }
    .menu-item:hover {
      background: #374151;
      color: #fff;
    }
    .menu-active {
      background: #3b82f6;
      color: #fff;
    }
  }

  .main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .header {
      height: 60px;
      flex-shrink: 0;
      background: #fff;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 20px;
      .collapse-btn {
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }

    .page-content {
      flex: 1;
      overflow: hidden;
      background: #f9fafb;

      .fade-enter-active,
      .fade-leave-active {
        transition: opacity 0.2s ease;
      }
      .fade-enter-from,
      .fade-leave-to {
        opacity: 0;
      }
    }
  }
}
</style>
