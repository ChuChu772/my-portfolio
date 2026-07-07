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
            src="/project2/cover.webp"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>

  <div
    class="grid-layout8 justify-end items-start flex sm:flex-row-reverse my-[var(--margin)]"
    id="Visual Concept Development"
  >
    <div
      class="col-span-3 md:col-span-2 lg:col-start-2 gap-4 flex flex-col md:sticky md:top-1/2 md:-translate-y-1/2"
    >
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">01 . 01</h5>
        <h4>Information Architecture</h4>
      </div>
      <div class="flex flex-col gap-4 justify-between">
        <h3 class="w-full">
          {{ t("project2.InformationArchitecture") }}
        </h3>
      </div>
    </div>
    <div
      class="lg:col-span-4 lg:col-start-5 md:col-span-4 col-span-3 aspect-[16/9] order-1 md:order-2 gap-4 flex flex-col"
    >
      <video
        src="/project2/project22.mp4"
        class="w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
      ></video>

      <video
        src="/project2/project23.mp4"
        class="w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
      ></video>
      <video
        src="/project2/project21.mp4"
        class="w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
      ></video>
    </div>
  </div>

  <div
    class="grid-layout8 justify-end items-end flex !mt-[var(--margin)] !pb-0 !mb-0"
    id="Visual Concept Development"
  >
    <div class="lg:col-span-3 md:col-span-4 col-span-3 gap-4 flex flex-col">
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">02 . 01</h5>
        <h4 class="">Visual Concept Development</h4>
      </div>
      <div class="flex gap-4 justify-between md:pb-8">
        <h3 class="w-full">
          {{ t("project2.VisualConcept") }}
        </h3>
      </div>
    </div>
  </div>
  <div class="w-screen p-4">
    <div class="timeline-item flex gap-4 py-4 relative justify-start">
      <div class="line absolute top-0 left-0 w-full h-[1px] bg-gray-300" />
      <h4 class="shrink-0 w-16 pt-2">
        <span class="px-2 py-1 bg-[var(--Asecondary)] text-white">1999</span>
      </h4>
      <img src="/Pattern/w1.png" alt="" class="box h-20 w-20 object-cover" />
      <img src="/Pattern/w2.png" alt="" class="box h-20 w-20 object-cover" />
      <img src="/Pattern/w3.png" alt="" class="box h-20 w-20 object-cover" />
    </div>

    <!-- 2005: 大螢幕偏左 -->
    <div
      class="timeline-item py-4 relative flex flex-wrap gap-4 justify-start lg:justify-end lg:pl-[20%]"
    >
      <div class="line absolute top-0 left-0 w-full h-[1px] bg-gray-300" />
      <h4 class="shrink-0 w-16 pt-2">
        <span class="px-2 py-1 bg-[var(--Asecondary)] text-white">1999</span
        ><span class="px-2 py-1 bg-[var(--color)] text-white">1999</span>
      </h4>
      <div class="flex flex-wrap gap-4 flex-1">
        <img src="/Pattern/w4.png" alt="" class="box h-20 w-20 object-cover" />
        <img src="/Pattern/w5.png" alt="" class="box h-20 w-20 object-cover" />
        <img src="/Pattern/w6.png" alt="" class="box h-20 w-20 object-cover" />
        <img src="/Pattern/w7.png" alt="" class="box h-20 w-20 object-cover" />
        <img src="/Pattern/w8.png" alt="" class="box h-20 w-20 object-cover" />
      </div>
    </div>

    <!-- 2010: 大螢幕靠右，box 可換行 -->
    <div
      class="timeline-item py-4 relative flex flex-wrap gap-4 justify-start lg:justify-end lg:pl-[20%]"
    >
      <div class="line absolute top-0 left-0 w-full h-[1px] bg-gray-300" />
      <h4 class="shrink-0 w-16 pt-2">
        <span class="px-2 py-1 bg-[var(--Asecondary)] text-white">1999</span
        ><span class="px-2 py-1 bg-[var(--color)] text-white">1999</span>
      </h4>
      <div class="flex flex-wrap gap-4 flex-1">
        <img src="/Pattern/w18.png" alt="" class="box h-20 w-20 object-cover" />
        <img src="/Pattern/w15.png" alt="" class="box h-20 w-20 object-cover" />
        <img src="/Pattern/w9.png" alt="" class="box h-20 w-20 object-cover" />
        <img src="/Pattern/w10.png" alt="" class="box h-20 w-20 object-cover" />
        <img src="/Pattern/w11.png" alt="" class="box h-20 w-20 object-cover" />
        <img src="/Pattern/w12.png" alt="" class="box h-20 w-20 object-cover" />
        <img src="/Pattern/w13.png" alt="" class="box h-20 w-20 object-cover" />
        <img src="/Pattern/w14.png" alt="" class="box h-20 w-20 object-cover" />
        <img src="/Pattern/w16.png" alt="" class="box h-20 w-20 object-cover" />
        <img src="/Pattern/w17.png" alt="" class="box h-20 w-20 object-cover" />
      </div>
    </div>

    <!-- 2015: 大螢幕靠右 -->
    <div
      class="timeline-item flex gap-4 py-4 relative justify-start lg:justify-end lg:pr-4"
    >
      <div class="line absolute top-0 left-0 w-full h-[1px] bg-gray-300" />
      <h4 class="shrink-0 w-16 pt-2">
        <span class="px-2 py-1 bg-[var(--Asecondary)] text-white">1999</span>
      </h4>
      <img src="/Pattern/w19.png" alt="" class="box h-20 w-20 object-cover" />
      <img src="/Pattern/w20.png" alt="" class="box h-20 w-20 object-cover" />
    </div>
  </div>

  <div
    class="grid-layout8 justify-start items-center flex sm:flex-row-reverse my-[var(--margin)]"
    id="Visual Concept Development"
  >
    <div
      class="lg:col-span-2 md:col-span-3 col-span-3 gap-4 flex flex-col items-start"
    >
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">02 . 02</h5>
        <h4 class="">Form Exploration</h4>
      </div>
      <div class="flex flex-col gap-4 justify-between pb-8">
        <h3 class="w-full">
          {{ t("project2.FormExploration") }}
        </h3>
      </div>
    </div>
    <div
      ref="exploreRef"
      class="lg:col-span-6 md:col-span-6 col-span-3 grid grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-4 gap-2 items-center"
    >
      <img
        src="/project2/explore1.jpg"
        class="explore-item opacity-0 w-full aspect-[1/1] object-cover"
      />
      <div
        class="explore-item opacity-0 md:w-4 md:h-4 w-1 h-1 md:ml-1 md:mr-3 mr-1 border-t-[0.5px] border-r-[0.5px] border-black rotate-45"
      ></div>
      <img
        src="/project2/explore2.png"
        class="explore-item opacity-0 w-full aspect-[1/1] object-cover"
      />
      <div
        class="explore-item opacity-0 md:w-4 md:h-4 w-1 h-1 md:ml-1 md:mr-3 mr-1 border-t-[0.5px] border-r-[0.5px] border-black rotate-45"
      ></div>
      <img
        src="/project2/explore3.png"
        class="explore-item opacity-0 w-full aspect-[1/1] object-cover"
      />
    </div>
  </div>

  <div
    class="grid-layout8 justify-end items-start flex sm:flex-row-reverse my-[var(--margin)]"
    id="Visual Concept Development"
  >
    <div class="col-span-3 md:col-span-2 gap-4 flex flex-col md:sticky top-14">
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">02 . 04</h5>
        <h4 class="">Interaction Design</h4>
      </div>
      <div class="flex flex-col gap-4 justify-between">
        <h3 class="w-full">
          {{ t("project2.InteractionDesign") }}
        </h3>
      </div>
    </div>
    <div
      class="lg:col-span-6 md:col-span-4 col-span-3 gap-4 aspect-[16/9] order-1 md:order-2"
    >
      <img
        src="/project2/ceremic-04.webp"
        class="w-full aspect-[16/9] object-cover"
      />
    </div>
  </div>
  <div
    class="grid-layout8 justify-start items-start flex sm:flex-row-reverse my-[var(--margin)]"
    id="Visual Concept Development"
  >
    <div
      class="md:col-span-3 col-span-3 md:col-start-1 gap-4 flex flex-col md:sticky top-14"
    >
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">03 . 01</h5>
        <h4 class="">Some Crafting Pieces</h4>
      </div>
    </div>
    <div
      class="lg:col-span-5 md:col-span-3 col-span-3 grid md:grid-cols-[repeat(4,1fr)] grid-cols-[repeat(4,1fr)] gap-3 sm:gap-4 items-center"
    >
      <img
        v-for="(img, index) in images"
        :key="index"
        :src="img"
        class="w-full aspect-[3/4] object-cover"
      />
    </div>
  </div>

  <div
    class="grid-layout8 justify-start items-start flex sm:flex flex-col my-[var(--margin)]"
    id="Visual Concept Development"
  >
    <div class="col-span-6 lg:col-start-2 gap-4 flex flex-col">
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">03 . 02</h5>
        <h4 class="">Final Outcome</h4>
      </div>
    </div>
    <div
      class="lg:col-span-6 lg:col-start-2 col-span-6 gap-3 sm:gap-4 flex flex-col items-center"
    >
      <img
        src="/project2/ceremic-01.webp"
        class="w-full aspect-[16/9] object-cover"
      />
      <img
        src="/project2/ceremic-02.webp"
        class="w-full aspect-[16/9] object-cover"
      />
      <img
        src="/project2/ceremic-03.webp"
        class="w-full aspect-[16/9] object-cover"
      />
      <img
        src="/project2/ceremic-05.webp"
        class="w-full aspect-[16/9] object-cover"
      />
    </div>
  </div>
</template>

<style scoped>
.timeline-item {
  opacity: 0;
  transform: translateY(40px);
}

.line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.5px;
  background: var(--Asecondary);

  transform: scaleX(0);
  transform-origin: left;
}

.box {
  opacity: 0;
}
@media (max-width: 440px) {
  .box {
    width: 60px;
    height: 60px;
  }
}
</style>

<script setup>
import ProjectLayout from "~/components/ProjectLayout.vue";
const { t } = useI18n();

useSeoMeta({
  title: "PiPiChouPortfolio",
  description: "Project 拾遺",
  ogImage: "/project2/cover.webp",
});

async function preloadResources() {
  const videos = [
    "/project2/project22.mp4",
    "/project2/project23.mp4",
    "/project2/project21.mp4",
  ];

  const images = [
    "/Pattern/w1.png",
    "/Pattern/w2.png",
    "/Pattern/w3.png",
    "/Pattern/w4.png",
    "/Pattern/w5.png",
    "/Pattern/w6.png",
    "/Pattern/w7.png",
    "/Pattern/w8.png",
    "/Pattern/w9.png",
    "/Pattern/w10.png",
    "/Pattern/w11.png",
    "/Pattern/w12.png",
    "/Pattern/w13.png",
    "/Pattern/w14.png",
    "/Pattern/w15.png",
    "/Pattern/w16.png",
    "/Pattern/w17.png",
    "/Pattern/w18.png",
    "/Pattern/w19.png",
    "/project2/Pattern/w20.png",
    "/project2/explore1.jpg",
    "/project2/explore2.png",
    "/project2/explore3.png",
    "/project3/b1.webp",
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

const images = Array.from({ length: 12 }, (_, i) => {
  return `/project2/record/record${i + 1}.webp`;
});
const project = computed(() => ({
  title: t("project2.title"),
  description: t("project2.description"),
  roles: ["Product Designer", "UI/UX Designer", "Full-Stack Developer"],

  link: "2026 Website Link",
  links: "https://chuchu772.github.io/chuchu/k2/tty",

  sections: [
    {
      id: "01",
      title: "Website Development",
      items: ["Information Architecture", "Mobile Extension Of The Exhibition"],
    },
    {
      id: "02",
      title: "Creative Media Design",
      items: [
        "Visual Concept Development",
        "Form Exploration",
        "Interaction Design",
      ],
    },
    {
      id: "03",
      title: "Ceramic Crafting",
      items: ["Some Crafting Pieces"],
    },
    {
      id: "04",
      title: "Degree Show",
      items: ["Final Outcome"],
    },
  ],
}));

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imgWrapRef = ref(null);
const imgRef = ref(null);

const exploreRef = ref(null);
let exploreTrigger = null;

onMounted(() => {
  preloadResources();
  if (!imgWrapRef.value || !imgRef.value) return;

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

  gsap.registerPlugin(ScrollTrigger);

  const items = gsap.utils.toArray(".timeline-item");

  items.forEach((item) => {
    const line = item.querySelector(".line");

    const boxes = item.querySelectorAll(".box");
    const title = item.querySelector("h4");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        end: "bottom 60%",
      },
    });

    // 1️⃣ 整段進場
    tl.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    // 2️⃣ 線條畫出來
    if (line) {
      tl.to(
        line,
        {
          scaleX: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3",
      );
    }

    // 3️⃣ 標題先出現
    tl.to(
      title,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.2",
    );

    // 4️⃣ ⭐ box stagger（重點在這）
    tl.to(
      boxes,
      {
        opacity: 1,
        duration: 0.4,
        stagger: 0.08, // 👈 每個 box 依序出現
        ease: "power2.out",
      },
      "-=0.2",
    );
  });

  if (!exploreRef.value) return;

  const itemsform = exploreRef.value.querySelectorAll(".explore-item");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: exploreRef.value,
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  });

  tl.to(itemsform, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.15,
  });

  if (tl.scrollTrigger) exploreTrigger = tl.scrollTrigger;
});

onBeforeUnmount(() => {
  exploreTrigger?.kill();
});
</script>
