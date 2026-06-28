<template>
  <div class="map-page">
    <div id="map-container" class="map-container"></div>

    <LayerPanel v-model:visible="layerPanelVisible" :layer-list="layerList" @toggle="handleLayerToggle" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import LayerPanel from '@/components/gis/LayerPanel.vue';

const layerPanelVisible = ref(true);

const layerList = ref([
  { id: 'base-map', name: '底图', visible: true, type: 'base' },
  { id: 'road-layer', name: '道路图层', visible: true, type: 'vector' },
  { id: 'building-layer', name: '建筑图层', visible: false, type: 'vector' },
  { id: 'poi-layer', name: 'POI兴趣点', visible: true, type: 'point' },
]);

let mapInstance = null;

const initMap = () => {};

const handleLayerToggle = layer => {};

onMounted(() => {
  initMap();
});

onUnmounted(() => {});
</script>

<style lang="scss" scoped>
.map-page {
  position: relative;
  width: 100%;
  height: 100%;
  .map-container {
    width: 100%;
    height: 100%;
    background: #e5e7eb;
  }
}
</style>
