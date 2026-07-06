<template>
  <Header />
  <Book />
  <div class="h-[100svh] w-screen relative overflow-hidden pointer-events-none">
    <div class="grid-layout8">
      <div class="lg:col-span-2 md:col-span-3 col-span-2 mt-12">
        <p ref="introTextRef">
          Drawing has been part of my world for as long as I can remember. This
          collection is a renewed interpretation of my 2024 illustration
          portfolio, bringing together stories, memories, and dreams that have
          quietly grown with me over the years.
        </p>
      </div>
    </div>
    <div class="absolute bottom-0 w-screen px-4">
      <img src="/pipi.png" alt="" class="opacity-1 absolute" />
    </div>

    <!-- 圖片輪播：JS 控制單一 currentIndex，只有目前這張跟下一張在做 crossfade -->
    <div class="loader bottom-0 w-screen px-4">
      <img
        v-for="(src, i) in roadFrames"
        :key="src"
        :ref="(el) => setFrameRef(el as HTMLElement, i)"
        :src="src"
        class="frame"
      />
    </div>

    <div
      class="marquee flex absolute md:bottom-[-50px] bottom-0 left-0 w-full pointer-events-none overflow-hidden z-[-1]"
    >
      <div ref="track" class="marquee-track flex">
        <img v-for="(img, i) in [...images, ...images]" :key="i" :src="img" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useTextLineAnimation } from "@/composables/useTextLineAnimation";
import gsap from "gsap";

useSeoMeta({
  title: "PiPi's Illustration",
  description: "PiPiChouPortfolio",
  ogImage: "/book/book1.webp",
});

const roadFrames = ["/book/road1.png", "/book/road2.png", "/book/road3.png"];
const frameEls = ref<(HTMLElement | null)[]>([]);

function setFrameRef(el: HTMLElement | null, i: number) {
  frameEls.value[i] = el;
}

function decodeImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img
      .decode()
      .then(() => resolve())
      .catch(() => resolve());
  });
}

let slideshowTimer: ReturnType<typeof setInterval> | null = null;
let currentIndex = 0;

function startSlideshow() {
  const els = frameEls.value;
  if (els.length === 0) return;

  // 一開始：第一張顯示，其餘全部隱藏
  els.forEach((el, i) => {
    if (!el) return;
    gsap.set(el, { opacity: i === 0 ? 1 : 0 });
  });

  slideshowTimer = setInterval(() => {
    const nextIndex = (currentIndex + 1) % els.length;
    const currentEl = els[currentIndex];
    const nextEl = els[nextIndex];

    if (currentEl) {
      gsap.set(currentEl, { opacity: 0 });
    }
    if (nextEl) {
      gsap.set(nextEl, { opacity: 1 });
    }

    currentIndex = nextIndex;
  }, 2000);
}

onBeforeUnmount(() => {
  if (slideshowTimer) clearInterval(slideshowTimer);
});

/* ============================================================
   Intro 文字動畫
   ============================================================ */
const introTextRef = ref<HTMLElement | null>(null);
const introTextAnim = useTextLineAnimation(introTextRef, { delay: 0, y: 14 });

/* ============================================================
   Marquee
   ============================================================ */
const track = ref();

const images = ["/book/illu.png", "/book/illu.png"];
const preloadImages = [
  "/book/book1.webp",
  "/book/book2.webp",
  "/book/book3.webp",
  "/book/book4.webp",
  "/book/book5.webp",
  "/book/book6.webp",
  "/book/book7.webp",
  "/book/book8.webp",
  "/book/book9.webp",
  "/book/book10.webp",
  "/book/book11.webp",
  "/book/book12.webp",
];

onMounted(async () => {
  introTextAnim.run();

  // 先確認三張輪播圖都真的 decode 完成，再啟動輪播
  await Promise.all(roadFrames.map(decodeImage));
  startSlideshow();

  gsap.to(track.value, {
    x: -(track.value.scrollWidth / 2),
    duration: 40,
    ease: "none",
    repeat: -1,
  });

  preloadImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
});
</script>

<style scoped>
.page {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: -1;
}

.cover-btn {
  width: clamp(140px, 22vw, 320px);
  height: clamp(220px, 37vw, 520px);
  object-fit: cover;
  cursor: pointer;
  border-radius: 2px 8px 8px 2px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.cover-btn:hover {
  transform: translateY(-4px);
  box-shadow: 6px 8px 28px rgba(0, 0, 0, 0.4);
}

.marquee {
  width: 100%;
  overflow: hidden;
}

.marquee img {
  width: 800px;
  flex-shrink: 0;
}

.loader {
  width: 100%;
  opacity: 0.5;
  position: relative;
}

.frame {
  position: absolute;
  bottom: -90vh;
  left: 0;
  width: 100%;
  object-fit: cover;
  opacity: 0;
}
</style>
