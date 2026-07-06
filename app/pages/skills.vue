<template>
  <div
    ref="trailTargetRef"
    class="grid-layout8 h-screen w-screen overflow-hidden"
  >
    <!-- 背景層：GooMorph，純視覺鋪滿全畫面，自己內部照原本邏輯監聽滑鼠 -->
    <div class="absolute inset-0 z-0">
      <Goomorph />
    </div>
    <div class="col-span-2 h-full">
      <!-- 入場動畫：[ illustration ] [ resume ] [ Creative Media Design ] -->

      <p class="leading-none">
        My work exists at the intersection of design, technology, and
        interaction. With a background in Creative Media Design and front-end
        development, I am interested in how digital experiences can communicate
        ideas, evoke emotions, and encourage participation.
      </p>
    </div>
    <div class="col-span-1 h-full col-start-6">
      <p class="leading-none">
        This portfolio presents selected projects across UI/UX design, web
        development, and interactive media.
      </p>
    </div>
    <div class="col-span-2 h-full col-start-8 text-right">
      <p class="leading-none">
        PiPiChou based in Taiwan<br /><br />
        Email : matsu310720@gmail.com
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import { useMouseTrailText } from "@/composables/useMouseTrailText";
import gsap from "gsap";
import { useRouter } from "vue-router";

const router = useRouter();

// ── 滑鼠跟隨文字 ──────────────────────────────────────────
const trailTargetRef = ref<HTMLElement | null>(null);
const flowContainer = ref<HTMLElement | null>(null);

const { bind } = useMouseTrailText({
  text: "My work is rooted in the quiet details of everyday life, capturing fleeting moments and subtle emotions. Beyond design, I find inspiration in drawing, reading, and observing the world around me, allowing these everyday encounters to quietly shape my creations.",
  fontSize: 9,
  fontFamily: "monospace",
  maxWords: 80,
  zIndex: 99,
});

// bind() 回傳 { cleanup, fadeOutAll }，直接存這一個物件就好，
// 不要再另外拆成 cleanupTrail / trailFadeOutAll 兩個變數（原本沒賦值，永遠是 undefined）
let trail: ReturnType<typeof bind> | null = null;

// ── items 進場/離場動畫 ────────────────────────────────────
// 用同一個 master timeline 管理所有 item，離場時直接整個倒轉播放
const masterTl = gsap.timeline({ paused: true });
let isNavigating = false;

onMounted(async () => {
  await nextTick();

  const items = flowContainer.value?.querySelectorAll(".flow-item");
  if (!items) return;

  items.forEach((item, i) => {
    const left = item.querySelector(".left");
    const right = item.querySelector(".right");
    const text = item.querySelector(".item-text");

    gsap.set(left, { x: 20 });
    gsap.set(right, { x: -20 });
    gsap.set(text, { opacity: 0 });

    const t = i * 0.2; // 每個 item 進場的時間點（絕對時間，方便整體倒轉）

    masterTl
      .to(
        [left, right],
        {
          x: (idx) => (idx === 0 ? -4 : 4),
          duration: 0.8,
          opacity: 1,
          ease: "power3.out",
        },
        t,
      )
      .to(
        text,
        {
          opacity: 1,
          duration: 0.3,
        },
        t + 0.4,
      );
  });

  masterTl.play();
});

onMounted(() => {
  trail = bind(trailTargetRef.value || document.body);
});

onBeforeUnmount(() => {
  trail?.cleanup();
});

// ── 離場：trail 淡出 + items 動畫倒轉，兩者一起播完才換頁 ──
function reverseItems(): Promise<void> {
  return new Promise((resolve) => {
    masterTl.eventCallback("onReverseComplete", () => resolve());
    masterTl.timeScale(1.8).reverse(); // 倒轉速度加快一點，離場感覺俐落
  });
}

async function navigateTo(to: string): Promise<void> {
  if (isNavigating) return; // 避免連續點擊觸發多次離場動畫
  isNavigating = true;

  await Promise.all([trail?.fadeOutAll() ?? Promise.resolve(), reverseItems()]);

  router.push(to);
}
</script>

<style scoped>
.page {
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
}
</style>
