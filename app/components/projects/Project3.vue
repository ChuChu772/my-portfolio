<template>
  <ProjectLayout
    :project="project"
    class="projectLayout top-0 mt-12 md:fixed"
  />
  <div class="w-screen md:min-h-screen flex flex-col" id="Interface Implement">
    <div class="md:flex-1 h-6"></div>
    <div>
      <div class="grid-layout8 sm:!mb-0">
        <div
          ref="imgWrapRef"
          class="sm:col-span-4 col-span-3 md:col-span-6 lg:col-span-5 bg-black w-full aspect-[16/9] overflow-hidden"
        >
          <img
            ref="imgRef"
            src="/project3/b1.webp"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>

  <div
    class="grid-layout8 justify-end items-end flex !mt-[var(--margin)] !pb-0"
    id="Visual Concept Development"
  >
    <div class="lg:col-span-5 md:col-span-4 col-span-3 gap-4 flex flex-col">
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">01 . 01</h5>
        <h4 class="">Visual Concept Development</h4>
      </div>
      <div class="flex flex-col gap-4 justify-between">
        <h3 class="w-full">
          {{ t("project3.con") }}
        </h3>
        <h3 class="w-full">
          {{ t("project3.VisualConcept1") }}
        </h3>
      </div>
    </div>
  </div>

  <div
    class="grid-layout8 justify-end items-end flex sm:flex-row-reverse !mb-[var(--margin)]"
    id="Visual Concept Development"
  >
    <div
      class="lg:col-span-3 md:col-span-2 col-span-3 gap-4 flex flex-col order-2 md:order-1"
    >
      <h3 class="w-full">
        {{ t("project3.VisualConcept2") }}
      </h3>
    </div>
    <div
      class="lg:col-span-5 md:col-span-4 col-span-3 gap-4 aspect-[16/9] order-1 md:order-2"
    >
      <img src="/project3/b2.webp" alt="" class="w-full h-full object-cover" />
    </div>
  </div>

  <div
    class="grid-layout8 justify-start items-start flex sm:flex-row-reverse my-[var(--margin)]"
    id="Visual Concept Development"
  >
    <div
      class="md:col-span-2 lg:col-start-2 col-span-3 md:col-start-1 gap-4 flex flex-col md:sticky md:top-1/2 md:-translate-y-1/"
    >
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">01 . 02</h5>
        <h4 class="">Graphic System Design</h4>
      </div>
      <div class="flex gap-4 justify-between">
        <h3 class="w-full">
          {{ t("project3.GraphicSystemDesign") }}
        </h3>
      </div>
    </div>
    <div
      class="lg:col-span-3 lg:col-start-5 md:col-span-2 flex flex-col col-span-3 gap-4 items-center"
    >
      <img src="/project3/b3.webp" alt="" class="w-full h-full object-cover" />
      <img src="/project3/b5.webp" alt="" class="w-full h-full object-cover" />
    </div>
  </div>

  <div
    class="grid-layout8 !mb-[var(--margin)] justify-end items-end flex"
    id="Technical Implementation"
  >
    <div class="lg:col-span-3 md:col-span-3 col-span-3 gap-4 flex flex-col">
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">01 . 03</h5>
        <h4>Technical Implementation</h4>
      </div>
      <div class="flex gap-4 justify-between">
        <h3 class="w-full">
          {{ t("project3.TechnicalImplementation") }}
        </h3>
      </div>
    </div>

    <div
      class="lg:col-span-5 lg:col-start-4 md:col-span-3 md:col-start-4 col-span-3 col-start-1 aspect-[16/9]"
    >
      <img src="/project3/b4.webp" alt="" class="w-full h-full object-cover" />
    </div>
  </div>

  <div class="grid-layout8 my-[var(--margin)] justify-start items-start">
    <div class="col-span-2 gap-4 flex flex-col">
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">02 . 01</h5>
        <h4 class="">Project Showcase Video</h4>
      </div>
    </div>

    <!-- 縮圖預覽：自動播放 + loop 的 Vimeo -->
    <div
      class="lg:col-span-6 md:col-span-4 col-span-3 w-full aspect-[16/9] bg-black cursor-pointer overflow-hidden"
      @click="openModal"
    >
      <iframe
        ref="previewRef"
        class="w-full h-full object-contain pointer-events-none"
        :src="previewSrc"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
      />
    </div>

    <!-- Modal：用 v-show 讓它一直存在、預先載入 -->
    <Teleport to="body">
      <div
        v-show="open"
        class="fixed inset-0 z-[999] bg-black/40 backdrop-blur flex items-center justify-center transition-opacity p-3 duration-300"
        :class="
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        "
        @click.self="close"
      >
        <div class="w-full max-w-6xl aspect-video relative group">
          <iframe
            ref="vimeoRef"
            class="w-full h-full object-contain"
            :src="vimeoSrc"
            frameborder="0"
            allow="autoplay; fullscreen"
          />

          <!-- 你的 UI 完全不變 -->
          <div
            class="absolute bottom-0 left-0 w-full px-3 py-2 sm:py-4 sm:px-4 bg-gradient-to-t from-black/90 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div class="w-full flex justify-between sm:mb-4 mb-2">
              <h4>{{ formatTime(currentTime) }}</h4>
              <h4>{{ formatTime(duration) }}</h4>
            </div>

            <div
              class="relative w-full h-[2px] bg-white/20 rounded-full cursor-pointer sm:mb-4 mb-2"
            >
              <div
                class="absolute top-0 left-0 h-full bg-white rounded-full"
                :style="{ width: `${(currentTime / duration) * 100}%` }"
              />
              <input
                type="range"
                min="0"
                :max="duration"
                step="0.01"
                v-model="currentTime"
                @input="seek"
                class="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
              />
            </div>

            <div
              class="flex items-center gap-6 text-xs tracking-widest uppercase select-none"
            >
              <button
                class="hover:opacity-60 transition-opacity font-light"
                @click="togglePlay"
              >
                <h4>{{ isPlaying ? "Pause" : "Play" }}</h4>
              </button>
              <div class="flex-1" />
              <button
                class="hover:opacity-60 transition-opacity font-light w-14 text-right"
                @click="toggleMute"
              >
                <h4>{{ muted ? "Unmute" : "Mute" }}</h4>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Player from "@vimeo/player";
import ProjectLayout from "~/components/ProjectLayout.vue";
const { t } = useI18n();

useSeoMeta({
  title: "PiPiChouPortfolio",
  description: "Project 氣息的反饋",
  ogImage: "/project3/b1.webp",
});

gsap.registerPlugin(ScrollTrigger);

const project = computed(() => ({
  title: t("project3.title"),
  description: t("project3.description"),
  roles: ["Creative Designer", "UI/UX Designer", "Full-Stack Developer"],
  link: "",
  sections: [
    {
      id: "01",
      title: "Creative Media Design",
      items: [
        "Visual Concept Development",
        "Graphic System Design",
        "Technical Implementation",
      ],
    },
    {
      id: "02",
      title: "2024 Final Project",
      items: ["Project Showcase Video"],
    },
  ],
}));

async function preloadResources() {
  const images = [
    "/project3/b1.webp",
    "/project3/b2.webp",
    "/project3/b3.webp",
    "/project3/b4.webp",
    "/project3/b5.webp",
    "/project4/cover.webp",
  ];

  const preloadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = src;
    });

  await Promise.all([...images.map(preloadImage)]);
}

const imgWrapRef = ref(null);
const imgRef = ref(null);

const vimeoId = "1207309445";

const previewRef = ref(null);
const previewSrc = `https://player.vimeo.com/video/${vimeoId}?background=1&muted=1&autoplay=1&loop=1&controls=0`;
let previewPlayer = null;

const open = ref(false);
const vimeoRef = ref(null);
const vimeoSrc = `https://player.vimeo.com/video/${vimeoId}?muted=1&autoplay=0&controls=0`;

const isPlaying = ref(false);
const muted = ref(true);
const currentTime = ref(0);
const duration = ref(0);

let player = null;

onMounted(() => {
  preloadResources();
  if (imgWrapRef.value && imgRef.value) {
    gsap.from(imgWrapRef.value, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1.2,
      ease: "power2.out",
    });
    gsap.from(imgRef.value, {
      scale: 1.2,
      duration: 1.2,
      ease: "power2.out",
    });
  }

  gsap.to(".projectLayout", {
    opacity: 0,
    duration: 0.6,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".projectLayout",
      start: "top 40px",
      toggleActions: "play none none reverse",
    },
  });

  // 一進頁面就把兩個 Vimeo player 都建立、預先載入好
  nextTick(() => {
    initPreviewPlayer();
    initVimeoPlayer();
  });
});

onUnmounted(() => {
  previewPlayer?.unload();
  previewPlayer = null;
  player?.unload();
  player = null;
});

function initPreviewPlayer() {
  if (previewPlayer || !previewRef.value) return;
  previewPlayer = new Player(previewRef.value);
  // background=1 模式會自動 autoplay + loop，不需要額外控制
}

function initVimeoPlayer() {
  if (player || !vimeoRef.value) return; // 只建立一次

  player = new Player(vimeoRef.value);

  player.getDuration().then((d) => {
    duration.value = d;
  });

  player.on("timeupdate", (data) => {
    currentTime.value = data.seconds;
  });

  player.on("play", () => (isPlaying.value = true));
  player.on("pause", () => (isPlaying.value = false));
}

function openModal() {
  open.value = true;
  player?.play();
}

function close() {
  open.value = false;
  player?.pause();
}

function togglePlay() {
  if (!player) return;
  if (isPlaying.value) player.pause();
  else player.play();
}

function toggleMute() {
  if (!player) return;
  const next = !muted.value;
  player.setMuted(next).then(() => {
    muted.value = next;
  });
}

function seek(e) {
  if (!player) return;
  const t = Number(e.target.value);
  player.setCurrentTime(t).then(() => {
    currentTime.value = t;
  });
}

function formatTime(sec) {
  const m = Math.floor(sec / 60) || 0;
  const s = Math.floor(sec % 60) || 0;
  return `${m}:${String(s).padStart(2, "0")}`;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
