<template>
  <Header />

  <div ref="overlayRef" class="fixed inset-0 z-50 pointer-events-none">
    <div
      v-for="(project, index) in projects"
      :key="index"
      :ref="(el) => (cardRefs[index] = el)"
      class="absolute"
    />
  </div>

  <section
    ref="sectionRef"
    class="grid-layout8 !py-0 !w-screen opacity-0 max-md:!gap-2 !mt-12 sm:!mt-20 md:!mt-0"
  >
    <div
      class="md:col-span-2 col-span-3 md:py-[50vh] !py-0 flex flex-col mb-10 md:mb-0 md:justify-center justify-end"
    >
      <div
        v-for="(project, index) in projects"
        :key="index"
        :ref="(el) => (itemRefs[index] = el)"
        class="pro !cursor-pointer py-1 transition-all duration-500 py-2"
        :class="[
          index === activeIndex ? 'py-4 pl-2 opacity-100' : ' opacity-25',
        ]"
        @click="scrollToIndex(index)"
      >
        <div
          class="flex items-center justify-between text-xs font-light w-full"
        >
          <h3>{{ project.title }}</h3>
          <h4
            class="transition-all duration-500"
            :class="[index === activeIndex ? 'opacity-100' : ' opacity-0']"
          >
            {{ project.date }}
          </h4>
        </div>
      </div>
    </div>

    <div
      class="md:col-span-4 col-span-3 relative md:sticky md:top-0 flex md:h-screen w-full items-center justify-center max-md:aspect-[16/9]"
    >
      <img
        v-for="(project, index) in projects"
        :key="index"
        :ref="(el) => (imgRefs[index] = el)"
        :src="project.image"
        @click="goProject(projects[activeIndex].id)"
        class="peer absolute cursor-pointer w-full aspect-[16/9] md:px-8 transition-all duration-700 ease-out object-contain md:hover:opacity-60"
        :class="
          index === activeIndex
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-0 pointer-events-none'
        "
      />

      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black pointer-events-none opacity-0 scale-0 rotate-0 transition-all duration-700 ease-out md:peer-hover:opacity-100 md:peer-hover:scale-100 md:peer-hover:rotate-180"
      />
    </div>
    <div
      ref="goButtonRef"
      class="col-span-3 text-end md:hidden mb-10 opacity-0"
      @click="goProject(projects[activeIndex].id)"
    >
      <h4>GO TO PROJECT</h4>
    </div>

    <div
      ref="rightPanelRef"
      class="md:col-span-2 col-span-3 md:sticky md:top-0 flex md:h-screen md:items-center md:justify-center relative md:hidden lg:flex"
    >
      <Transition name="fade-up" mode="out-in">
        <div :key="activeIndex" class="gap-2 flex flex-col">
          <h5 class="leading-normal">
            {{ projects[activeIndex].content }}
          </h5>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted, nextTick } from "vue";
import gsap from "gsap";
const { t } = useI18n();

const activeIndex = ref(0);
const itemRefs = [];
const cardRefs = [];
const overlayRef = ref(null);
const sectionRef = ref(null);
const imgRefs = [];
const rightPanelRef = ref(null);
const goButtonRef = ref(null); // 「GO TO PROJECT」手機版按鈕

const projects = computed(() => [
  {
    title: t("project1.title"),
    image: "/project1/cover.webp",
    date: "2026",
    id: 1,
    content: t("project1.description"),
  },
  {
    title: t("project2.title"),
    image: "/project2/cover.webp",
    date: "2025",
    id: 2,
    content: t("project2.description"),
  },
  {
    title: t("project3.title"),
    image: "/project3/b1.webp",
    date: "2024",
    id: 3,
    content: t("project3.description"),
  },
  {
    title: t("project4.title"),
    image: "/project4/cover.webp",

    date: "2024",
    id: 4,
    content: t("project4.description"),
  },
  {
    title: t("project5.title"),
    image: "/project5/cover.webp",

    date: "2023",
    id: 5,
    content: t("project5.description"),
  },
]);

const goProject = async (id) => {
  const tl = gsap.timeline();

  // Step 1: 重置非 active 的 cardRefs 到對應 itemRef 位置
  itemRefs.forEach((el, i) => {
    if (i === activeIndex.value || !el) return;
    const card = cardRefs[i];
    if (!card) return;
    const rect = el.getBoundingClientRect();
    gsap.set(card, {
      x: rect.left,
      y: rect.top + 2,
      width: rect.width,
      height: rect.height - 4,
      opacity: 1,
      backgroundColor: "#000000",
      backgroundImage: "none",
      scale: 1,
      clipPath: "inset(100% 0% 0% 0%)",
    });
  });

  const inactiveCards = cardRefs.filter((_, i) => i !== activeIndex.value);

  tl.to(inactiveCards, {
    clipPath: "inset(0% 0% 0% 0%)",
    duration: 0.4,
    ease: "power2.inOut",
    stagger: 0.05,
  });

  const inactiveItems = itemRefs.filter((_, i) => i !== activeIndex.value);

  tl.to(inactiveItems, {
    opacity: 0,
    duration: 0.01,
  });

  tl.to(inactiveCards, {
    clipPath: "inset(0% 0% 100% 0%)",
    duration: 0.4,
    ease: "power2.inOut",
    stagger: 0.05,
  });

  // Step 5: active 左側項目 + 右側說明文 + GO TO PROJECT 按鈕 opacity → 0
  tl.to(
    [
      itemRefs[activeIndex.value],
      rightPanelRef.value,
      goButtonRef.value,
    ].filter(Boolean),
    {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    },
    "-=0.4",
  );

  tl.to(
    imgRefs[activeIndex.value],
    {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.4,
      ease: "power2.out",
    },
    "-=0.2",
  );

  await new Promise((resolve) => {
    tl.eventCallback("onComplete", resolve);
  });

  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  navigateTo(`/project/${id}`);
};

const lenis = inject("lenis");
const isScrolling = ref(false);

/* -------------------------
   INTRO ANIMATION
------------------------- */

async function playIntro() {
  const vh = window.innerHeight;
  const vw = window.innerWidth;

  const totalHeight = vh * 0.8;
  const cardHeight = totalHeight / projects.value.length;
  const cardWidth = vw * 0.4;
  const startY = vh * 0.1;
  const centerX = vw / 2 - cardWidth / 2;

  cardRefs.forEach((card, i) => {
    gsap.set(card, {
      x: centerX,
      y: startY + i * cardHeight,
      width: cardWidth,
      height: cardHeight - 8,
      scale: 0,
      opacity: 1,
      backgroundImage: `url(${projects.value[i].image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    });
  });

  const tl = gsap.timeline();

  // Step 1: 圖片 scale 0 → 1 依序出現
  tl.to(cardRefs, {
    scale: 1,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.08,
  });

  tl.to({}, { duration: 0.4 });

  tl.to(cardRefs, {
    backgroundImage: "none",
    backgroundColor: "#000000",
    height: 20,
    duration: 0.4,
    ease: "power2.inOut",
    stagger: 0.05,
    y: (i) => startY + i * cardHeight + cardHeight / 2 - 10,
  });

  tl.to(
    cardRefs,
    {
      duration: 0.6,
      ease: "power2.inOut",
      stagger: 0.05,
      onStart() {},
      // 用 gsap 的 function-based 值
      x: (i) => {
        const el = itemRefs[i];
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return rect.left;
      },
      y: (i) => {
        const el = itemRefs[i];
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return rect.top + rect.height / 2 - 10;
      },
      width: (i) => {
        const el = itemRefs[i];
        if (!el) return 100;
        return el.getBoundingClientRect().width;
      },
    },
    "-=0.1",
  );

  tl.to(
    cardRefs,
    {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.04,
    },
    "-=0.2",
  );

  // section 淡入的同時，GO TO PROJECT 按鈕也一起淡入
  tl.to(
    [sectionRef.value, goButtonRef.value].filter(Boolean),
    {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    },
    "-=0.2",
  );

  await tl;
}

/* -------------------------
   SCROLL
------------------------- */

function scrollToIndex(index) {
  if (window.innerWidth < 768) {
    activeIndex.value = index;
    return;
  }

  const el = itemRefs[index];
  if (!el) return;

  activeIndex.value = index;

  lenis?.value?.scrollTo(el, {
    offset: -window.innerHeight / 2 + el.offsetHeight / 2,
    duration: 1.2,
  });
}

function updateActive() {
  if (isScrolling.value) return;

  const center = window.innerHeight / 2;
  let closest = 0;
  let minDistance = Infinity;

  itemRefs.forEach((el, index) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const itemCenter = rect.top + rect.height / 2;
    const distance = Math.abs(center - itemCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closest = index;
    }
  });

  activeIndex.value = closest;
}

onMounted(async () => {
  await nextTick();
  await playIntro();
});

onUnmounted(() => {
  // lenis?.value?.off("scroll", updateActive);
});
</script>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.pro:nth-child(1) {
  padding-top: 0 !important;
}
.pro:nth-last-child(1) {
  padding-bottom: 0 !important;
}

@media (max-width: 640px) {
  .grid-layout8 {
    width: 100vw;
    display: flex;
    flex-direction: column;
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 8px !important;
    padding: 32px 16px !important;
    box-sizing: border-box;
    justify-content: start;
    height: 100vh;
    overflow: hidden;
  }
  .grid-layout8 > div {
    overflow: hidden;
  }
}
</style>
