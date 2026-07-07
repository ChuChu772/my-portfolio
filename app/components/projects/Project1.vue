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
          class="sm:col-span-4 col-span-3 md:col-span-6 lg:col-span-5 w-full aspect-[16/9] overflow-hidden"
        >
          <img
            ref="imgRef"
            src="/project1/cover.webp"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
  <div
    class="grid-layout8 justify-end items-center flex sm:flex-row-reverse !my-[var(--margin)]"
    id="Brand Strategy"
  >
    <div
      class="md:col-span-2 col-span-3 lg:col-start-2 gap-3 sm:gap-4 flex flex-col"
    >
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">01 . 01</h5>
        <h4 class="">Brand Strategy</h4>
      </div>
      <div class="flex flex-col gap-3 sm:gap-4 justify-between">
        <h3 class="w-full">
          {{ t("project1.BrandStrategy1") }}
        </h3>
        <h3 class="w-full">
          {{ t("project1.BrandStrategy2") }}
        </h3>
      </div>
    </div>
    <div
      class="lg:col-span-4 lg:col-start-5 md:col-span-4 col-span-3 gap-3 sm:gap-4 aspect-[16/9] order-1 md:order-2"
    >
      <img
        src="/project1/about.jpg"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>
  </div>

  <div class="grid-layout8 !mb-[var(--margin)]" id="Information Architecture">
    <!-- 標題列 + 文字側欄 wrapper -->
    <div
      class="lg:col-span-8 md:col-span-4 md:col-start-1 col-span-2 flex lg:flex-row justify-between flex-col gap-2"
    >
      <div class="flex gap-2">
        <h5>01 . 01</h5>
        <h4>Information Architecture</h4>
      </div>

      <div class="flex flex-col gap-1">
        <div class="grid grid-cols-2 lg:w-45">
          <h5 class="text-left tracking-[0.95px]">01</h5>
          <h4 class="text-right">Home Page</h4>
        </div>
        <div class="grid grid-cols-2 lg:w-45">
          <h5 class="text-left">02</h5>
          <h4 class="text-right whitespace-nowrap">Product List</h4>
        </div>
        <div class="grid grid-cols-2 lg:w-45">
          <h5 class="text-left">03</h5>
          <h4 class="text-right">Product Detail</h4>
        </div>
        <div class="grid grid-cols-2 lg:w-45">
          <h5 class="text-left">04</h5>
          <h4 class="text-right">Checkout</h4>
        </div>
      </div>
    </div>
    <!-- 圖片：mobile 3欄各佔1(前三張) + 第四張換行, tablet 各佔1.5→用col-span-2, desktop col-span-2 -->
    <div
      class="lg:col-span-2 md:col-span-2 col-span-1 bg-gray-100 aspect-[390/844] overflow-hidden shadow-[0_0_5px_rgba(255,105,180,0.1)]"
    >
      <img src="/project1/ia1.webp" class="w-full h-full object-cover" />
    </div>
    <div
      class="lg:col-span-2 md:col-span-2 col-span-1 bg-gray-100 aspect-[390/844] overflow-hidden shadow-[0_0_5px_rgba(255,105,180,0.1)]"
    >
      <img src="/project1/ia2.webp" class="w-full h-full object-cover" />
    </div>
    <div
      class="lg:col-span-2 md:col-span-2 col-span-1 bg-gray-100 aspect-[390/844] overflow-hidden shadow-[0_0_5px_rgba(255,105,180,0.1)]"
    >
      <img src="/project1/ia3.webp" class="w-full h-full object-cover" />
    </div>
    <!-- 第四張：mobile 換行獨佔一格對齊2x2，用 col-start -->
    <div
      class="lg:col-span-2 md:col-span-2 col-span-1 md:col-start-auto lg:col-start-auto bg-gray-100 aspect-[390/844] overflow-hidden shadow-[0_0_5px_rgba(255,105,180,0.1)]"
    >
      <img src="/project1/ia4.webp" class="w-full h-full object-cover" />
    </div>
  </div>

  <div
    class="grid-layout8 justify-end flex items-start sm:flex-row-reverse !my-[var(--margin)]"
  >
    <div
      class="md:col-span-2 col-span-3 gap-3 sm:gap-4 flex flex-col lg:sticky lg:top-14"
    >
      <div class="flex flex-col gap-3 sm:gap-4 justify-between">
        <h3 class="w-full">
          {{ t("project1.InformationArchitecture") }}
        </h3>
      </div>
    </div>
    <div
      class="lg:col-span-6 md:col-span-4 col-span-3 gap-3 sm:gap-4 aspect-[16/9] order-1 md:order-2"
    >
      <img src="/project1/ia.webp" alt="" class="w-full h-full object-cover" />
    </div>
  </div>

  <div
    class="grid-layout8 justify-start items-center flex sm:flex-row-reverse my-[var(--margin)]"
    id="Standard Purchase Flow"
  >
    <div
      class="lg:col-span-2 md:col-span-3 col-span-3 lg:col-start-3 gap-4 flex flex-col self-start md:sticky md:top-1/3"
    >
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">02 . 02</h5>
        <h4>Standard Purchase Flow</h4>
      </div>
      <div class="flex flex-col gap-4 justify-between">
        <h3 class="w-full">
          {{ t("project1.StandardPurchaseFlow") }}
        </h3>
      </div>
    </div>

    <div
      class="lg:col-span-3 md:col-span-6 col-span-3 md:gap-4 gap-2 items-start justify-start mt-8 md:mt-0"
    >
      <div class="flow-wrap flex flex-col items-center gap-4">
        <div class="flow-item flex items-center justify-center gap-2">
          <span class="side-symbol left">Ｏ</span>
          <h3 class="item-text opacity-0">HOME</h3>
          <span class="side-symbol right">Ｏ</span>
        </div>

        <span class="arrow">↓</span>

        <div class="flow-item flex items-center justify-center gap-2">
          <span class="side-symbol left">[</span>
          <h3 class="item-text opacity-0">Product List</h3>
          <span class="side-symbol right">]</span>
        </div>

        <span class="arrow">↓</span>

        <div class="flow-item flex items-center justify-center gap-2">
          <span class="side-symbol left">[</span>
          <h3 class="item-text opacity-0">Product Detail</h3>
          <span class="side-symbol right">]</span>
        </div>

        <span class="arrow">↓</span>

        <div class="flow-item flex items-center justify-center gap-2">
          <span class="side-symbol left">[</span>
          <h3 class="item-text opacity-0">Add To Cart</h3>
          <span class="side-symbol right">]</span>
        </div>

        <span class="arrow">↓</span>

        <div class="flow-item flex items-center justify-center gap-2">
          <span class="side-symbol left">[</span>
          <h3 class="item-text opacity-0">Cart</h3>
          <span class="side-symbol right">]</span>
        </div>

        <span class="arrow">↓</span>

        <div class="flow-item flex items-center justify-center gap-2">
          <span class="side-symbol left">[</span>
          <h3 class="item-text opacity-0">Checkout</h3>
          <span class="side-symbol right">]</span>
        </div>

        <span class="arrow">↓</span>

        <div class="flow-item flex items-center justify-center gap-2">
          <span class="side-symbol left">◇</span>
          <h3 class="item-text opacity-0">Payment</h3>
          <span class="side-symbol right">◇</span>
        </div>

        <span class="arrow">↓</span>

        <div class="flow-item flex items-center justify-center gap-2">
          <span class="side-symbol left">[</span>
          <h3 class="item-text opacity-0">Order Success</h3>
          <span class="side-symbol right">]</span>
        </div>

        <span class="arrow">↓</span>

        <div class="flow-item flex items-center justify-center gap-2">
          <span class="side-symbol left">[</span>
          <h3 class="item-text opacity-0">Receipt</h3>
          <span class="side-symbol right">]</span>
        </div>
      </div>
    </div>
  </div>

  <div class="grid-layout8 !mb-[var(--margin)]" id="Visual Design">
    <div class="lg:col-span-1 md:col-span-2 col-span-3 flex gap-2">
      <h5>01 . 02</h5>
      <h4>Visual Design</h4>
    </div>

    <!-- 圖片：mobile 全寬，tablet 全寬，desktop 2欄從第3格開始 -->
    <div
      class="lg:col-span-2 lg:col-start-3 md:col-span-2 md:col-start-2 sm:col-span-1 col-span-1 col-start-3 flex gap-2"
    >
      <img src="/frame1.png" class="w-full h-auto object-contain" />
    </div>

    <!-- 色票：mobile 全寬，tablet 全寬，desktop 3欄從第6格開始 -->
    <div
      class="lg:col-span-3 lg:col-start-6 md:col-span-3 md:col-start-4 col-span-3 sm:col-span-2 py-2 sm:py-0 col-start-auto grid grid-cols-3 gap-3 sm:gap-4"
    >
      <ColorCard v-for="c in colors" :key="c.hex" :color="c" />
    </div>
  </div>

  <div
    class="grid-layout8 flex items-start !my-[var(--margin)]"
    id="Responsive Layout"
  >
    <div class="md:col-span-8 col-span-2 gap-3 sm:gap-4 flex flex-col">
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">04 . 01</h5>
        <h4>Responsive Layout</h4>
      </div>
      <div class="flex flex-col gap-3 sm:gap-4 justify-between">
        <h3 class="w-full"></h3>
      </div>
    </div>

    <div class="md:col-span-6 col-span-3 gap-4">
      <!-- 大圖：佔 6 欄寬（lg），16:9 -->
      <img
        src="/project1/rwd3.webp"
        alt=""
        class="w-full object-cover shadow-[0_0_5px_rgba(255,105,180,0.1)]"
      />
    </div>
    <div class="md:col-span-2 col-span-1 col-start-3 gap-4">
      <!-- 大圖：佔 6 欄寬（lg），16:9 -->
      <img
        src="/project1/rwd2.webp"
        alt=""
        class="w-full object-cover shadow-[0_0_5px_rgba(255,105,180,0.1)]"
      />
    </div>
  </div>

  <div class="grid-layout8 !mb-[var(--margin)]" id="Interaction Design">
    <div class="col-span-3 md:col-span-6 lg:col-span-8 gap-2 flex">
      <h5>01 . 02</h5>
      <h4>Interaction Design</h4>
    </div>

    <div
      class="lg:col-span-8 md:col-span-6 col-span-3 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2"
    >
      <h3
        class="col-span-3 md:col-span-1 md:self-start md:sticky md:top-14 relative"
      >
        Get Receipt!
      </h3>
      <video
        src="/project1/interaction1.mp4"
        autoplay
        muted
        loop
        playsinline
        class="w-full aspect-[16/9] object-cover lg:col-span-7 md:col-span-5 col-span-3"
      ></video>
    </div>
    <div
      class="lg:col-span-8 md:col-span-6 col-span-3 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2"
    >
      <h3
        class="col-span-3 md:col-span-1 md:self-start md:sticky md:top-14 relative"
      >
        svg Animation
      </h3>

      <video
        src="/project1/interaction2.mp4"
        autoplay
        muted
        loop
        playsinline
        class="w-full aspect-[16/7] object-cover lg:col-span-7 md:col-span-5 col-span-3"
      ></video>
    </div>
  </div>

  <div
    class="grid-layout8 justify-end items-start flex sm:flex-row-reverse mb-[var(--margin)]"
    id="Full-Stack Developer"
  >
    <div
      class="md:col-span-3 col-span-3 sm:col-start-1 col-start-1 md:col-start-2 gap-3 sm:gap-4 flex flex-col"
    >
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">01 . 03</h5>
        <h4>Full-Stack Developer</h4>
      </div>
      <div class="flex flex-col gap-3 sm:gap-4 justify-between">
        <h3 class="w-full">
          {{ t("project1.FullStackDevelopment") }}
        </h3>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>

<script setup>
import ColorCard from "~/components/ColorCard.vue";
import { colors } from "~/composables/colors";
import ProjectLayout from "~/components/ProjectLayout.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
const { t } = useI18n();

useSeoMeta({
  title: "PiPiChouPortfolio",
  description: "Project La1ako",
  ogImage: "/project1/cover.webp",
});

const project = computed(() => ({
  title: t("project1.title"),
  description: t("project1.description"),
  roles: ["Product Designer", "UI/UX Designer", "Full-Stack Developer"],

  link: "",

  sections: [
    {
      id: "01",
      title: "Product Designer",
      items: [
        "Brand Strategy",
        "Information Architecture",
        "Standard Purchase Flow",
      ],
    },
    {
      id: "02",
      title: "UI/UX Designer",
      items: ["Visual Design", "Responsive Layout", "Interaction Design"],
    },
    {
      id: "03",
      title: "Web Development",
      items: ["Full-Stack Developer"],
    },
  ],
}));

async function preloadResources() {
  const videos = [
    "/project1/interaction1.mp4",
    "/project1/interaction2.mp4",
    "project21.mp4",
    "project22.mp4",
    "project23.mp4",
  ];

  const images = [
    "/project1/about.jpg",
    "/project1/cover.webp",
    "/project1/ia.webp",
    "/project1/ia1.webp",
    "/project1/ia2.webp",
    "/project1/ia3.webp",
    "/project1/ia4.webp",
    "/project1/rwd1.webp",
    "/project1/rwd2.webp",
    "/project1/rwd3.webp",
    "cover.webp",
  ];

  const preloadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = src;
    });

  const preloadVideo = (src) =>
    new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "auto";
      video.muted = true;
      // 只要 metadata/資料開始準備好就算，避免整支影片下載完才 resolve 導致卡太久
      video.addEventListener("canplaythrough", resolve, { once: true });
      video.addEventListener("error", resolve, { once: true });
      video.src = src;
      video.load();
    });

  await Promise.all([...images.map(preloadImage), ...videos.map(preloadVideo)]);
}

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

const imgWrapRef = ref(null);
const imgRef = ref(null);

let triggers = [];

onMounted(() => {
  preloadResources();
  if (imgWrapRef.value && imgRef.value) {
    // wrapper 從下往上展開
    gsap.from(imgWrapRef.value, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1.2,
      ease: "power2.out",
    });

    // 圖片反向移動，讓它看起來是靜止的，wrapper 在移動
    gsap.from(imgRef.value, {
      scale: 1.2,
      duration: 1.2,
      ease: "power2.out",
    });
  }

  const fadeOutTween = gsap.to(".projectLayout", {
    opacity: 0,
    duration: 0.6,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".projectLayout",
      start: "top -1%",
      toggleActions: "play none none reverse",
    },
  });
  if (fadeOutTween.scrollTrigger) triggers.push(fadeOutTween.scrollTrigger);

  const items = document.querySelectorAll(".flow-item");

  items.forEach((item) => {
    const left = item.querySelector(".side-symbol.left");
    const right = item.querySelector(".side-symbol.right");
    const text = item.querySelector(".item-text");
    const arrow = item.nextElementSibling;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      left,
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
    )
      .fromTo(
        right,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "<",
      )

      .to(text, { opacity: 1, duration: 0.4, ease: "power1.out" }, "-=0.2")

      .fromTo(
        arrow,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.1",
      );
    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
  });
});

onBeforeUnmount(() => {
  triggers.forEach((t) => t.kill());
  triggers = [];
});
</script>

<style scoped>
.flow-item {
  min-height: 10px;
}

.side-symbol {
  font-size: 13px;
  font-family: monospace;
  display: inline-block;
}

.item-text {
  text-align: center;
  padding-top: 4px;
}

.arrow {
  font-size: 18px;
  opacity: 0.4;
}
</style>
