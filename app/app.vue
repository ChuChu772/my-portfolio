<template>
  <Transition name="splash">
    <div
      v-if="showSplash"
      class="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
    >
      <PiPiLaBu />
    </div>
  </Transition>

  <NuxtPage />
</template>

<script setup>
import { ref, provide, onMounted } from "vue";
import Lenis from "lenis";
import { useEntranceController } from "@/composables/Useentrancecontroller";

const lenis = ref(null);
provide("lenis", lenis);

const showSplash = ref(true);
const { triggerEntrance } = useEntranceController();

async function preloadResources() {
  const images = [
    "/project2/p1.png",
    "/project1/cover.png",
    "/project3/b1.webp",
    "/project4/cover.webp",
    "/project5/cover.webp",
    "/pipi.png",
    "/book/road1.png",
    "/book/road2.png",
    "/book/road3.png",
    "/book/illu.png",
  ];
  await Promise.all(
    images.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src;
        }),
    ),
  );
}

async function waitForFonts() {
  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {}
  }
}

onMounted(async () => {
  lenis.value = new Lenis();

  const raf = (time) => {
    lenis.value.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // 真正的資源預載 + 字體載入 + 最短顯示時間（避免載入太快時 splash 一閃而過）
  await Promise.all([
    preloadResources(),
    waitForFonts(),
    new Promise((resolve) => setTimeout(resolve, 800)),
  ]);

  showSplash.value = false;
  triggerEntrance();
});
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#__nuxt {
  width: 100%;
  height: 100%;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.6s;
}

.page-enter-from {
  opacity: 0;
}

.page-leave-to {
  opacity: 0;
}

.splash-leave-active {
  transition: opacity 0.5s ease;
}
.splash-leave-to {
  opacity: 0;
}
</style>
