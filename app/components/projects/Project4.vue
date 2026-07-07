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
            src="/project4/cover.webp"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>

  <div
    class="grid-layout8 justify-end items-center flex sm:flex-row-reverse my-[var(--margin)]"
    id="Visual Concept Development"
  >
    <div class="col-span-3 md:col-span-2 lg:col-start-2 gap-4 flex flex-col">
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">01 . 01</h5>
        <h4 class="">Visual Concept Development</h4>
      </div>
      <div class="flex flex-col gap-4 justify-between">
        <h3 class="w-full">
          {{ t("project4.VisualConcept") }}
        </h3>
      </div>
    </div>
    <div
      class="lg:col-span-4 lg:col-start-5 md:col-span-4 col-span-3 gap-4 aspect-[4/3] order-1 md:order-2"
    >
      <img src="/project4/p41.webp" alt="" class="w-full h-full object-cover" />
    </div>
  </div>

  <div
    class="grid-layout8 justify-end items-start flex flex-col mb-64px"
    id="Interaction Design"
  >
    <div class="sm:col-span-6 gap-2 flex col-span-3">
      <h5 class="tracking-[0.95px]">01 . 02</h5>
      <h4 class="">Interaction Design</h4>
    </div>
    <div class="sm:col-span-4 lg:col-span-4 col-span-3 gap-4 flex flex-col">
      <div class="flex gap-4 justify-between flex-col md:flex-row">
        <h3 class="w-full">
          {{ t("project4.InteractionDesign1") }}
        </h3>
        <h3 class="w-full">
          {{ t("project4.InteractionDesign2") }}
        </h3>
      </div>
    </div>

    <div
      class="lg:col-span-8 sm:col-span-6 col-span-3 md:flex-row md:col-span-6 col-span-3 flex flex-col gap-3 sm:gap-4 items-stretch mb-[var(--margin)]"
    >
      <!-- 左側大圖 -->
      <div class="flex-1">
        <img src="/project4/p44.webp" class="w-full h-full object-cover" />
      </div>
      <!-- 右側兩張上下疊 -->
      <div class="flex-1 flex sm:gap-4 gap-3">
        <div class="flex-1">
          <img src="/project4/p43.webp" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1">
          <img src="/project4/p45.webp" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </div>

  <div
    class="grid-layout8 justify-end items-start flex sm:flex-row-reverse mb-[var(--margin)]"
    id="Technical Implementation"
  >
    <div class="col-span-3 lg:col-start-2 gap-4 flex flex-col">
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">01 . 03</h5>
        <h4>Technical Implementation</h4>
      </div>
      <div class="flex flex-col gap-4 justify-between">
        <h3 class="w-full">
          {{ t("project4.TechnicalImplementation1") }}
        </h3>
        <h3 class="w-full">
          {{ t("project4.TechnicalImplementation2") }}
        </h3>
        <h3 class="w-full">
          {{ t("project4.TechnicalImplementation3") }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProjectLayout from "~/components/ProjectLayout.vue";
const { t } = useI18n();

useSeoMeta({
  title: "PiPiChouPortfolio",
  description: "Project 共生",
  ogImage: "/project4/cover.webp",
});

const project = computed(() => ({
  title: t("project4.title"),
  description: t("project4.description"),
  roles: ["Creative Designer"],

  link: "",

  sections: [
    {
      id: "01",
      title: "Creative Media Design",
      items: [
        "Visual Concept Development",
        "Interaction Design",
        "Technical Implementation",
      ],
    },
  ],
}));

async function preloadResources() {
  const images = [
    "/project4/cover.webp",
    "/project4/p41.webp",
    "/project4/p42.webp",
    "/project4/p43.webp",
    "/project4/p44.webp",
    "/project4/p45.webp",
    "/project5/cover.webp",
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

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imgWrapRef = ref(null);
const imgRef = ref(null);

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
});
</script>
