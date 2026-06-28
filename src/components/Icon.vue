<template>
  <i :class="iconClass" :style="iconStyle" aria-hidden="true"></i>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 16,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
});

const iconClass = computed(() => ['iconfont', `icon-${props.name}`]);

const iconStyle = computed(() => {
  const fontSize = typeof props.size === 'number' ? `${props.size}px` : props.size;
  return {
    fontSize,
    color: props.color,
  };
});
</script>

<style lang="scss" scoped>
.iconfont {
  display: inline-block;
  user-select: none;
  margin-left: 4px;
}
</style>
