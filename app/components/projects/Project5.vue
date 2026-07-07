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
            src="/project5/51.webp"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="grid-layout8 my-[var(--margin)] justify-start items-start">
    <div class="col-span-1 gap-4 flex flex-col">
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">05 . 01</h5>
        <h4 class="">Final Outcome</h4>
      </div>
    </div>
    <div class="col-span-6 w-full aspect-[16/9] bg-black">
      <img src="/project5/52.webp" alt="" />
    </div>
  </div>
</template>

<script setup>
import ProjectLayout from "~/components/ProjectLayout.vue";
const { t } = useI18n();

useSeoMeta({
  title: "PiPiChouPortfolio",
  description: "Project 泡",
  ogImage: "/project5/51.webp",
});

const project = computed(() => ({
  title: t("project5.title"),
  description: t("project5.description"),

  roles: ["Creative Designer"],

  link: "",

  sections: [
    {
      id: "05",
      title: "Creative Foundation",
      items: ["Final Outcome"],
    },
  ],
}));

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imgWrapRef = ref(null);
const imgRef = ref(null);

onMounted(() => {
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
