<template>
  <div ref="trailTargetRef" class="fixed h-[100svh] w-screen overflow-hidden">
    <div ref="opa" class="absolute inset-0 z-0">
      <Goomorph />
    </div>

    <div class="grid-layout8 z-20 relative">
      <div class="md:col-span-2 col-span-1 z-20">
        <p ref="introTextRef" class="leading-[8px] md:leading-[12px] opacity-0">
          {{ t("home.title") }}
        </p>
      </div>
      <div
        class="md:col-span-1 md:col-start-4 col-start-3 col-span-1 lg:col-start-6"
      >
        <p
          ref="portfolioTextRef"
          class="leading-[8px] md:leading-[12px] opacity-0"
        >
          {{ t("home.title2") }}
        </p>
      </div>
      <div
        class="col-span-1 md:col-span-2 lg:col-start-8 md:text-right text-left"
      >
        <p
          ref="contactTextRef"
          class="leading-[8px] md:leading-[12px] opacity-0"
        >
          PiPiChou based in Taiwan
        </p>
        <p
          ref="contactTextRef2"
          class="leading-[8px] md:leading-[12px] opacity-0"
        >
          Email : matsu310720@gmail.com
        </p>
      </div>
    </div>

    <div
      ref="flowContainer"
      class="absolute inset-0 z-20 flex flex-col justify-center pointer-events-none items-center gap-2"
    >
      <a
        @click.prevent="navigateTo('/illustration')"
        class="pointer-events-auto cursor-pointer"
      >
        <div class="flow-item flex items-center justify-center gap-2">
          <span class="flow-dot-outer">
            <span class="flow-dot-inner h-2 w-2 bg-black"></span>
          </span>
          <h3 class="item-text opacity-0">ILLUSTRATIONS</h3>
        </div>
      </a>

      <a
        @click.prevent="navigateTo('/project')"
        class="pointer-events-auto cursor-pointer"
      >
        <div class="flow-item flex items-center justify-center gap-2">
          <span class="flow-dot-outer">
            <span class="flow-dot-inner h-2 w-2 bg-black"></span>
          </span>
          <h3 class="item-text opacity-0">DESIGN PROJECTS</h3>
        </div>
      </a>

      <div
        ref="language"
        class="flex flex-col items-start pointer-events-auto pt-4"
      >
        <LanguageSwitch />
      </div>
      <div class="absolute bottom-0 w-screen px-4">
        <img ref="pipiRef" src="/pipi.png" alt="" class="opacity-0" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import { useMouseTrailText } from "@/composables/useMouseTrailText";
import { useEntranceController } from "@/composables/Useentrancecontroller";
import { useTextLineAnimation } from "@/composables/useTextLineAnimation";
import gsap from "gsap";
import { useRouter } from "vue-router";
const { t } = useI18n();

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

let resourcesReady: Promise<void> | null = null;

function preloadResources(): Promise<void> {
  const images = [
    "/project2/cover.webp",
    "/project1/cover.webp",
    "/project3/b1.webp",
    "/project4/cover.webp",
    "/project5/cover.webp",
    "/pipi.png",
    "/book/road1.png",
    "/book/road2.png",
    "/book/road3.png",
    "/book/illu.png",
    "/book/book1.webp",
  ];

  return Promise.all(images.map(preloadImage)).then(() => undefined);
}

const router = useRouter();
const { registerContentEntrance } = useEntranceController();

const trailTargetRef = ref<HTMLElement | null>(null);
const flowContainer = ref<HTMLElement | null>(null);

const { bind } = useMouseTrailText({
  text: "I am drawn to the gentle poetry of everyday life—the moments that pass quietly yet linger in our memories. Through illustration, design, and interactive media, I create dreamy experiences inspired by curiosity, emotion, and imagination. Like collecting little stars along a journey, each project becomes a small world where stories, feelings, and wonder can softly unfold.",
  fontSize: 9,
  fontFamily: "monospace",
  maxWords: 80,
  zIndex: 9999,
  excludeSelector: ".flow-item",
});

let trail: ReturnType<typeof bind> | null = null;

const introTextRef = ref<HTMLElement | null>(null);
const portfolioTextRef = ref<HTMLElement | null>(null);
const contactTextRef = ref<HTMLElement | null>(null);
const contactTextRef2 = ref<HTMLElement | null>(null);
const opa = ref<HTMLElement | null>(null);

const introTextAnim = useTextLineAnimation(introTextRef, { delay: 0, y: 14 });
const portfolioTextAnim = useTextLineAnimation(portfolioTextRef, {
  delay: 0.15,
  y: 14,
});
const contactTextAnim2 = useTextLineAnimation(contactTextRef2, {
  delay: 0.3,
  y: 14,
});
const contactTextAnim = useTextLineAnimation(contactTextRef, {
  delay: 0.3,
  y: 14,
});

// ── language 的 opacity 入場離場 ───────────────────────
const language = ref<HTMLElement | null>(null);

function setLanguageInitial() {
  if (!language.value) return;
  gsap.set(language.value, { opacity: 0 });
}

function playLanguageIn(): void {
  if (!language.value) return;
  gsap.to(language.value, {
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    delay: 1,
  });
}

function playLanguageOut(): Promise<void> {
  return new Promise((resolve) => {
    if (!language.value) {
      resolve();
      return;
    }
    gsap.to(language.value, {
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => resolve(),
    });
  });
}

const pipiRef = ref<HTMLElement | null>(null);

function setPipiInitial() {
  if (!pipiRef.value) return;
  gsap.set(pipiRef.value, { scale: 2, opacity: 0 });
}

function playPipiIn(): void {
  if (!pipiRef.value) return;
  gsap.to(pipiRef.value, {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.15,
  });
}

function playPipiOut(): Promise<void> {
  return new Promise((resolve) => {
    if (!pipiRef.value) {
      resolve();
      return;
    }
    gsap.to(pipiRef.value, {
      scale: 2,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => resolve(),
    });
  });
}

function opaout(): void {
  if (!opa.value) return;
  gsap.to(opa.value, {
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });
}

const masterTl = gsap.timeline({ paused: true });
let isNavigating = false;

onMounted(async () => {
  await nextTick();

  const items = flowContainer.value?.querySelectorAll(".flow-item");
  if (!items) return;

  items.forEach((item, i) => {
    const text = item.querySelector(".item-text");
    const dot = item.querySelector(".flow-dot-outer");

    gsap.set(text, { opacity: 0 });
    gsap.set(dot, { opacity: 0, scale: 0 });

    const t = i * 0.2;

    masterTl
      .to(
        dot,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(2)",
        },
        t,
      )
      .to(
        text,
        {
          opacity: 1,
          duration: 0.3,
        },
        t + 0.15,
      );
  });
  setPipiInitial();
  setLanguageInitial();

  registerContentEntrance(() => {
    masterTl.play();
    introTextAnim.run();
    portfolioTextAnim.run();
    contactTextAnim.run();
    contactTextAnim2.run();
    playPipiIn();
    playLanguageIn();
  });
});

onMounted(() => {
  resourcesReady = preloadResources();
  trail = bind(trailTargetRef.value || document.body);
});

onBeforeUnmount(() => {
  trail?.cleanup();
});

function reverseItems(): Promise<void> {
  return new Promise((resolve) => {
    masterTl.eventCallback("onReverseComplete", () => resolve());
    masterTl.timeScale(1.8).reverse();
  });
}

async function navigateTo(to: string): Promise<void> {
  if (isNavigating) return;
  isNavigating = true;

  await Promise.all([
    trail?.fadeOutAll() ?? Promise.resolve(),
    reverseItems(),
    playPipiOut(),
    playLanguageOut(),
    opaout(),
    introTextAnim.playOut({ duration: 0.4, y: -14 }),
    portfolioTextAnim.playOut({ duration: 0.4, y: -14 }),
    contactTextAnim.playOut({ duration: 0.4, y: -14 }),
    contactTextAnim2.playOut({ duration: 0.4, y: -14 }),
    resourcesReady ?? Promise.resolve(),
  ]);

  introTextAnim.restore();
  portfolioTextAnim.restore();
  contactTextAnim.restore();

  router.push(to);
}
</script>

<style scoped>
.item-text {
  text-align: center;
  padding-top: 6px;
}

.flow-dot-outer {
  display: inline-block;
}

.flow-dot-inner {
  display: block;
  transition: transform 0.4s ease;
}

.flow-item:hover .flow-dot-inner {
  transform: rotate(90deg) scale(1.2);
}
</style>
