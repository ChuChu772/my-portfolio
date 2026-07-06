<template>
  <Header />

  <div ref="overlayRef" class="fixed inset-0 z-50 pointer-events-none">
    <div
      v-for="(project, index) in projects"
      :key="index"
      :ref="(el) => (cardRefs[index] = el)"
      class="absolute bg-black"
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
        class="peer absolute cursor-pointer w-full aspect-[16/9] md:px-8 transition-all duration-700 ease-out object-contain hover:opacity-60"
        :class="
          index === activeIndex
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-0 pointer-events-none'
        "
      />

      <!-- Hover Icon -->
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black pointer-events-none opacity-0 scale-0 rotate-0 transition-all duration-700 ease-out peer-hover:opacity-100 peer-hover:scale-100 peer-hover:rotate-180"
      />
    </div>
    <div
      ref="goButtonRef"
      class="col-span-3 text-end md:hidden mb-10 opacity-0"
      @click="goProject(projects[activeIndex].id)"
    >
      <h5>GO TO PROJECT</h5>
    </div>

    <div
      ref="rightPanelRef"
      class="md:col-span-2 col-span-3 md:sticky md:top-0 flex md:h-screen md:items-center md:justify-center relative md:hidden lg:flex"
    >
      <Transition name="fade-up" mode="out-in">
        <div :key="activeIndex" class="gap-2 flex flex-col">
          <h5 class="leading-normal">{{ projects[activeIndex].content }}</h5>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted, nextTick } from "vue";
import gsap from "gsap";

const activeIndex = ref(0);
const itemRefs = [];
const cardRefs = [];
const overlayRef = ref(null);
const sectionRef = ref(null);
const imgRefs = [];
const rightPanelRef = ref(null);
const goButtonRef = ref(null); // 「GO TO PROJECT」手機版按鈕

const projects = [
  {
    title: "La1ako",
    image: "/project1/cover.webp",
    desc: "樹脂飾品品牌網站",
    date: "2026",
    id: 1,
    content:
      "以 La1ako品牌為核心，打造一個兼具購物功能與情感體驗的線上空間。網站不僅提供商品展示與購買流程，更透過互動設計、動態效果與細膩的視覺語言，讓使用者在瀏覽過程中感受到品牌所營造的氛圍。藉由層層堆疊的視覺細節與互動回饋，讓網站成為品牌理念的延伸，而不只是商品交易的平台。",
  },
  {
    title: "拾遺",
    image: "/project2/cover.webp",
    desc: "互動植物網站",
    date: "2025",
    id: 2,
    content:
      "本作品結合陶瓷創作與網頁互動設計，透過數位介面重新詮釋台灣陶瓷的文化脈絡。整體網站分為三大單元：台灣陶瓷的歷史發展、以互動方式呈現的二十款紋樣文化寓意，以及陶瓷製作流程的介紹。使用者可透過點選不同時期或紋樣類別進行互動探索，理解台灣陶瓷如何在時間推移中逐步融合與演變，從泥土的原始狀態走向精緻的器物形式。",
  },
  {
    title: "氣息的反饋",
    image: "/project3/b1.webp",
    desc: "未來信件網站",
    date: "2024",
    id: 3,
    content:
      "這是一個穿戴式裝置，透過使用者的呼吸控制裝置收縮，模擬陪伴的感覺。作品源於對孤獨情緒的探索：孤獨不是單一的存在，而是缺席的感受與未被回應的渴望。裝置設計穿戴於頸部與手腕，並融入生活化的元素，如膠布式樣，讓陪伴在日常中自然發生。",
  },
  {
    title: "共生",
    image: "/project4/cover.webp",
    desc: "動畫網站",
    date: "2024",
    id: 4,
    content:
      "每隻鳥配有一段旋律，觀者觸碰鳥喙即可觸發音樂。當六隻鳥同時被觸發，六段旋律會組合成完整小樂曲。裝置需要六人協作，概念來自我對於人與人相處的理想狀態：每個人各自不同，卻在同一空間中互相影響、達成平衡。每段旋律，如同每個人的存在，都是不可或缺的。",
  },
  {
    title: "浮泡",
    image: "/project5/cover.webp",
    desc: "品牌形象網站",
    date: "2023",
    id: 5,
    content:
      "本作品以歐根紗作為主要材質，運用其半透明與光線折射所產生的色彩變化特性，發展出由少成多的視覺概念。透過重複堆疊、包覆與綁結的手法，將原本輕薄單一的纖維層層累積，使其逐漸轉化為具有體積感的結構，形成如泡泡般聚集的有機形態。利用光線穿透與流動所產生的視覺變化，使作品在不同觀看角度與光源條件下呈現多層次效果。整體試圖營造介於實體與幻象之間的視覺體驗，使材質本身成為介質，連結空間、光與感知的流動關係。",
  },
];

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

  // 圖片總高度空間
  const totalHeight = vh * 0.8;
  const cardHeight = totalHeight / projects.length;
  const cardWidth = vw * 0.4;
  const startY = vh * 0.1;
  const centerX = vw / 2 - cardWidth / 2;

  // 初始化 card 位置（直排置中）
  cardRefs.forEach((card, i) => {
    gsap.set(card, {
      x: centerX,
      y: startY + i * cardHeight,
      width: cardWidth,
      height: cardHeight - 8,
      scale: 0,
      opacity: 1,
      backgroundImage: `url(${projects[i].image})`,
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
