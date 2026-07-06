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
    <div
      class="marquee flex absolute md:bottom-[-50px] bottom-0 left-0 w-full pointer-events-none overflow-hidden z-[-1]"
    >
      <div ref="track" class="marquee-track flex">
        <img v-for="(img, i) in [...images, ...images]" :key="i" :src="img" />
      </div>
      <div
        class="loader absolute md:bottom-[-3px] bottom-0 w-full h-full z-[-10] opacity-50"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTextLineAnimation } from "@/composables/useTextLineAnimation";

const introTextRef = ref<HTMLElement | null>(null);
const introTextAnim = useTextLineAnimation(introTextRef, { delay: 0, y: 14 });

onMounted(() => {
  introTextAnim.run();
});
import gsap from "gsap";

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

onMounted(() => {
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

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
.loader {
  background-size: contain;
  background-repeat: no-repeat;
  animation: loading 3s steps(1) infinite;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@keyframes loading {
  0% {
    background-image: url("/book/road1.png");
    transform: translateY(0);
  }
  33% {
    background-image: url("/book/road2.png");
  }
  66% {
    background-image: url("/book/road3.png");
  }
}
</style>
