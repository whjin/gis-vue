<template>
  <div class="three-container" ref="containerRef"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

// DOM 容器
const containerRef = ref(null);

// Three.js 核心对象
let scene, camera, renderer, cube, animationId;

// 初始化场景
function init() {
  // 1. 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // 2. 创建透视相机
  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  // 3. 创建 WebGL 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  containerRef.value.appendChild(renderer.domElement);

  // 4. 创建几何体 + 材质 = 网格
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial({
    color: 0x42b883,
    roughness: 0.5,
    metalness: 0.2,
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 5. 添加环境光 + 平行光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
}

// 动画循环
function animate() {
  animationId = requestAnimationFrame(animate);

  // 让立方体旋转
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// 窗口大小变化自适应
function onResize() {
  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// 生命周期：挂载后初始化
onMounted(() => {
  init();
  animate();
  window.addEventListener('resize', onResize);
});

// 生命周期：卸载时清理资源，防止内存泄漏
onUnmounted(() => {
  window.removeEventListener('resize', onResize);
  cancelAnimationFrame(animationId);

  // 释放几何体和材质
  cube.geometry.dispose();
  cube.material.dispose();

  // 释放渲染器
  renderer.dispose();
  containerRef.value?.removeChild(renderer.domElement);
});
</script>

<style lang="scss" scoped>
.three-container {
  width: 100%;
  height: 100%;
}
</style>
