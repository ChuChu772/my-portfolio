<!-- <PiPiLaBu /> -->
<!--
  直接貼進你的 .vue 頁面（<template> / <script> / <style> 各自貼到對應位置）
  需要先安裝 gsap：npm install gsap
  記得把 border-[var(--color-Asecondary)] 換成你專案實際的顏色變數/class
-->

<template>
  <div class="loading-wrap">
    <!-- 中心方塊：本身就是定位錨點，四個角落方塊會「貼」在它的四個角上 -->
    <div ref="centerRef" class="center-sq">
      <!-- 左上 -->
      <div
        ref="cornerTL"
        class="absolute top-0 left-0 w-3 h-3 border-[var(--color-Asecondary)] border -translate-x-1/2 -translate-y-1/2"
      ></div>
      <!-- 右上 -->
      <div
        ref="cornerTR"
        class="absolute top-0 right-0 w-3 h-3 bg-black translate-x-1/2 -translate-y-1/2"
      ></div>
      <!-- 左下 -->
      <div
        ref="cornerBL"
        class="absolute bottom-0 left-0 w-3 h-3 bg-black -translate-x-1/2 translate-y-1/2"
      ></div>
      <!-- 右下 -->
      <div
        ref="cornerBR"
        class="absolute bottom-0 right-0 w-3 h-3 bg-black translate-x-1/2 translate-y-1/2"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";

const centerRef = ref(null);
const cornerTL = ref(null);
const cornerTR = ref(null);
const cornerBL = ref(null);
const cornerBR = ref(null);

let centerTl = null;
let cornerTl = null;

onMounted(() => {
  const corners = [
    cornerTL.value,
    cornerTR.value,
    cornerBL.value,
    cornerBR.value,
  ];

  centerTl = gsap.timeline({ repeat: -1 });

  centerTl.set(centerRef.value, { width: 0, height: 0, rotate: 0 });

  centerTl.to({}, { duration: 1 });

  centerTl.to({}, { duration: 1 });

  centerTl.to(centerRef.value, {
    width: 24,
    height: 24,
    duration: 1,
    ease: "power2.out",
  });

  centerTl.to({}, { duration: 1 });

  centerTl.to(centerRef.value, {
    rotate: "+=45",
    duration: 1,
    ease: "power1.inOut",
  });

  centerTl.to({}, { duration: 1 });

  centerTl.to(centerRef.value, {
    rotate: "+=45",
    duration: 1,
    ease: "power1.inOut",
  });

  centerTl.to({}, { duration: 1 });

  centerTl.to(centerRef.value, {
    rotate: "+=45",
    duration: 1,
    ease: "power1.inOut",
  });

  centerTl.to({}, { duration: 1 });

  centerTl.to(centerRef.value, {
    rotate: "+=45",
    duration: 1,
    ease: "power1.inOut",
  });

  centerTl.to({}, { duration: 1 });

  centerTl.to(centerRef.value, {
    rotate: "+=45",
    duration: 1,
    ease: "power1.inOut",
  });

  centerTl.to({}, { duration: 1 });

  centerTl.to(centerRef.value, {
    rotate: "+=45",
    duration: 1,
    ease: "power1.inOut",
  });

  centerTl.to({}, { duration: 1 });

  // 第 9 秒：再轉 45 度
  centerTl.to(centerRef.value, {
    rotate: "+=45",
    duration: 1,
    ease: "power1.inOut",
  });

  centerTl.to({}, { duration: 1 });

  centerTl.to(centerRef.value, {
    rotate: "+=45",
    duration: 1,
    ease: "power1.inOut",
  });

  // 第 8 秒：停頓
  centerTl.to({}, { duration: 1 });

  centerTl.to(centerRef.value, {
    rotate: "+=45",
    duration: 1,
    ease: "power1.inOut",
  });

  centerTl.to(centerRef.value, {
    rotate: "+=45",
    width: 0,
    height: 0,
    duration: 1,
    ease: "power2.out",
  });

  centerTl.to({}, { duration: 1 });

  cornerTl = gsap.timeline({ repeat: -1 });
  cornerTl.to(corners, { rotate: "+=360", duration: 1, ease: "power2.inOut" });
  cornerTl.to({}, { duration: 1 });
});

onBeforeUnmount(() => {
  centerTl?.kill();
  cornerTl?.kill();
});
</script>

<style scoped>
.loading-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* 中心方塊：透明背景，只有外框；本身是 relative，讓四個角落方塊可以用
   top:0/right:0/bottom:0/left:0 貼齊它目前的實際大小，大小改變時角落方塊會自動跟著移動 */
.center-sq {
  position: relative;
  background: transparent;
  box-sizing: border-box;
}
</style>
