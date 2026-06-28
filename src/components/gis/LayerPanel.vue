<template>
  <div class="layer-panel" :class="{ collapsed: !visible }">
    <div class="panel-header">
      <span class="panel-title">图层管理</span>
      <button class="toggle-btn" @click="handleToggle">
        {{ visible ? '收起' : '展开' }}
      </button>
    </div>

    <div v-show="visible" class="panel-body">
      <div v-for="layer in layerList" :key="layer.id" class="layer-item">
        <label class="layer-label">
          <input type="checkbox" :checked="layer.visible" @change="toggleLayer(layer)" />
          <span class="layer-name">{{ layer.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
  layerList: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:visible', 'toggle']);

const handleToggle = () => {
  emit('update:visible', !props.visible);
};

const toggleLayer = layer => {
  layer.visible = !layer.visible;
  emit('toggle', layer);
};
</script>

<style lang="scss" scoped>
.layer-panel {
  width: 280px;
  max-height: calc(100% - 32px);
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  border-radius: 0 0 0 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s ease;
  z-index: 10;

  .panel-header {
    height: 44px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e5e7eb;
    font-weight: 600;

    .toggle-btn {
      border: none;
      background: none;
      color: #3b82f6;
      cursor: pointer;
      font-size: 14px;
      margin-left: 6px;
    }
  }

  .panel-body {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;

    .layer-item {
      padding: 8px 16px;
      cursor: pointer;
      .layer-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
        .layer-name {
          font-size: 14px;
        }
      }
    }
    .layer-item:hover {
      background: #f3f4f6;
    }
  }
}

.collapsed {
  width: fit-content;
}
</style>
