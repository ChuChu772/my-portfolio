<script setup>
import {
  ref,
  computed,
  inject,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";

import { useRoute, useRouter } from "vue-router";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Project1 from "~/components/projects/Project1.vue";
import Project2 from "~/components/projects/Project2.vue";
import Project3 from "~/components/projects/Project3.vue";
import Project4 from "~/components/projects/Project4.vue";
import Project5 from "~/components/projects/Project5.vue";

import { projects } from "~/composables/projects";

gsap.registerPlugin(ScrollTrigger);

const projectComponents = {
  1: Project1,
  2: Project2,
  3: Project3,
  4: Project4,
  5: Project5,
};

const route = useRoute();
const router = useRouter();

const id = ref(Number(route.params.id));
const currentComponent = computed(() => projectComponents[id.value]);

const container = ref(null);
const scrollProgress = ref(0);
const smoothProgress = ref(0);

const triggerDistance = 1500;

let accumulated = 0;
let locked = false;
let completed = false;
let trigger;

const lenis = inject("lenis");
const disableScroll = () => lenis?.value?.stop();
const enableScroll = () => lenis?.value?.start();

/* -------------------------
   DETECT MOBILE
------------------------- */
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
};

/* -------------------------
   PROJECT NAVIGATION
------------------------- */
const currentIndex = () => projects.findIndex((p) => p.id === id.value);

const nextProject = () => {
  const idx = currentIndex();
  return idx === projects.length - 1 ? projects[0] : projects[idx + 1];
};

const prevProject = () => {
  const idx = currentIndex();
  return idx === 0 ? projects[projects.length - 1] : projects[idx - 1];
};

/* -------------------------
   NAVIGATE
------------------------- */
const navigateTo = async (project) => {
  if (!project || locked) return;
  locked = true;

  await gsap.to(container.value, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  await router.push(`/project/${project.id}`);
  window.scrollTo({ top: 0, behavior: "instant" });
};

const goNext = () => navigateTo(nextProject());
const goPrev = () => navigateTo(prevProject());

/* -------------------------
   WHEEL (desktop only)
------------------------- */
const onWheel = (e) => {
  if (locked || completed || isMobile.value) return;

  accumulated += e.deltaY;
  accumulated = Math.max(0, Math.min(accumulated, triggerDistance));
  scrollProgress.value = accumulated / triggerDistance;

  if (accumulated >= triggerDistance) {
    scrollProgress.value = 1;
    completed = true;
    setTimeout(goNext, 500);
  }
};

const progressTrack = ref(null);
const scrollHint = ref(null);

/* -------------------------
   LIFECYCLE
------------------------- */
onMounted(async () => {
  checkMobile();
  window.addEventListener("resize", checkMobile);

  disableScroll();
  await nextTick();

  gsap.set(container.value, { opacity: 0, y: 50 });
  if (scrollHint.value && progressTrack.value) {
    gsap.set([scrollHint.value, progressTrack.value], {
      y: "100%",
      opacity: 0,
    });
  }

  gsap.to(container.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    onComplete: () => {
      gsap.delayedCall(0.5, async () => {
        enableScroll();

        gsap.ticker.add(() => {
          smoothProgress.value +=
            (scrollProgress.value - smoothProgress.value) * 0.15;
        });

        if (!isMobile.value) {
          await nextTick(); // 確保 DOM 完全就緒
          trigger = ScrollTrigger.create({
            trigger: container.value,
            start: "bottom bottom",
            pin: true,
            pinSpacing: true,
            onEnter: () => {
              window.addEventListener("wheel", onWheel, { passive: true });
              gsap.fromTo(
                [scrollHint.value, progressTrack.value],
                { y: "100%", opacity: 0 },
                {
                  y: "0%",
                  opacity: 1,
                  duration: 0.6,
                  ease: "power2.out",
                  stagger: 0.1,
                },
              );
            },
            onLeaveBack: () => {
              window.removeEventListener("wheel", onWheel);
              accumulated = 0;
              scrollProgress.value = 0;
              gsap.to([scrollHint.value, progressTrack.value], {
                y: "100%",
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
              });
            },
          });
        }
      });
    },
  });
});
onBeforeUnmount(() => {
  window.removeEventListener("wheel", onWheel);
  window.removeEventListener("resize", checkMobile);
  trigger?.kill();
});
</script>

<template>
  <Header />
  <div
    class="grid-layout8 !m-0 fixed top-0 flex !px-3 !py-4 items-center justify-between w-full z-50 pointer-events-none"
  >
    <div
      class="col-span-2 col-start-3 pr-[2.5px] text-[var(--color-Aprimary)] flex justify-between"
    />
  </div>

  <div ref="container" class="detail">
    <component :is="currentComponent" />

    <!-- Progress bar（桌面才顯示） -->
    <div
      v-if="!isMobile"
      class="grid-layout8 relative w-full h-[200px] bg-[var(--Aprimary)] overflow-hidden"
    >
      <div
        class="col-span-6 lg:col-start-2 flex items-center justify-between gap-4"
      >
        <div class="overflow-hidden">
          <h4 ref="scrollHint" class="shrink-0 text-white">
            keep scrolling down for the next project
          </h4>
        </div>
        <div class="flex-1 relative h-[1px]">
          <div ref="progressTrack" class="absolute inset-0 bg-white/30" />
          <div
            class="absolute left-0 top-0 h-full bg-white"
            :style="{ width: smoothProgress * 100 + '%' }"
          />
        </div>
      </div>
    </div>

    <div
      v-if="!isMobile"
      class="fixed inset-0 bg-[#ffffff] pointer-events-none z-40"
      :style="{ opacity: smoothProgress }"
    />

    <!-- <div v-if="!isMobile" class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      {{ Math.round((1 - scrollProgress) * 1500) }}px
    </div> -->

    <div
      v-if="isMobile"
      class="flex justify-between px-4 pointer-events-none mb-6"
    >
      <button class="pointer-events-auto uppercase" @click="goPrev">
        <h4>[ Prev ]</h4>
      </button>
      <button class="pointer-events-auto uppercase" @click="goNext">
        <h4>[ Next ]</h4>
      </button>
    </div>
  </div>

  <!-- Mobile Prev/Next -->
</template>

<style scoped>
.detail {
  min-height: 100vh;
}

.card {
  padding: 30px;
  background: #eee;
  text-decoration: none;
  color: black;
}

.bar {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 6px;
  background: #ddd;
}

.bar-inner {
  height: 100%;
  background: black;
  width: 0%;
  transition: width 0.1s;
}

.hint {
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
}
.scroll {
  z-index: 99999;
}
</style>
