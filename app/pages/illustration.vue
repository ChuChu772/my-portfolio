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

    <div
      class="marquee flex absolute bottom-0 md:bottom-[-50px] left-0 w-full pointer-events-none overflow-hidden z-[-1]"
    >
      <div ref="track" class="marquee-track flex">
        <img v-for="(img, i) in [...images, ...images]" :key="i" :src="img" />
      </div>
    </div>
  </div>
  <div
    class="h-[100svh] w-screen absolute left-0 flex items-end mt-12 bottom-0 md:bottom-[-80px] lg:bottom-[-110px]"
  >
    <div class="loader w-screen">
      <img
        v-for="(src, i) in roadFrames"
        :key="src"
        :ref="(el) => setFrameRef(el as HTMLElement, i)"
        :src="src"
        class="frame"
      />
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
  }, 1000);
}

onBeforeUnmount(() => {
  if (slideshowTimer) clearInterval(slideshowTimer);
});

const introTextRef = ref<HTMLElement | null>(null);
const introTextAnim = useTextLineAnimation(introTextRef, { delay: 0, y: 14 });

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

.marquee {
  width: 100%;
  overflow: hidden;
}

.marquee img {
  width: 800px;
  flex-shrink: 0;
}

/* 給 loader 明確的高度，讓內部 absolute 定位的圖片有依據撐滿，
   並依斷點調整高度比例，配合 RWD */
.loader {
  width: 100%;
  opacity: 0.5;
  position: relative;
  height: 30vh;
}

@media (min-width: 768px) {
  .loader {
    height: 40vh;
  }
}

@media (min-width: 1024px) {
  .loader {
    height: 50vh;
  }
}

.frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
}
</style>
