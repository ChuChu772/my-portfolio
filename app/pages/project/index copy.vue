<template>
  <Header />
  <div
    class="grid-layout8 !m-0 !py-0 !h-screen !w-screen overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
    :class="
      introActive
        ? '-translate-y-[120vh] scale-[0.9] opacity-0'
        : 'translate-y-0 scale-100 opacity-100'
    "
  >
    <div
      ref="container"
      class="col-span-7 h-screen overflow-y-auto snap-y snap-mandatory"
      @scroll="onScroll"
    >
      <div
        v-for="item in baseProjects"
        :key="item.id"
        class="pro h-[70vh] snap-end grid grid-cols-7 items-center gap-4 pb-4"
      >
        <div
          class="col-span-2 flex flex-col justify-start items-center h-full gap-2 transition-all duration-700"
          :class="
            item.id === activeId
              ? 'translate-x-0 opacity-100'
              : 'translate-x-10 opacity-0'
          "
        >
          <h5>{{ item.title }}</h5>
          <p>{{ item.cate }}</p>
          <h4 class="leading-normal text-center">{{ item.content }}</h4>
        </div>

        <div class="col-span-5 h-full">
          <div class="h-full w-full overflow-hidden">
            <img
              :src="item.image"
              :alt="item.title"
              class="h-full w-full bg-gray-300 object-cover transition-all duration-700 origin-bottom-right"
              :class="
                item.id === activeId
                  ? 'scale-100 opacity-100'
                  : 'scale-[0.6] opacity-50'
              "
              @click="goProject(item.id)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-1 h-screen flex justify-end pt-[calc(30vh+17px)]">
      <div class="flex flex-col items-center gap-4">
        <h5 class="cursor-pointer" @click="prev">[ Prev ]</h5>
        <div class="flex flex-col gap-2">
          <h5>{{ activeIndex + 1 }}</h5>
          <h5>/</h5>
          <h5>{{ baseProjects.length }}</h5>
        </div>
        <h5 class="cursor-pointer" @click="next">[ Next ]</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from "vue";

const container = ref(null);

const goProject = (id) => navigateTo(`/project/${id}`);

const baseProjects = [
  {
    id: 1,
    title: "La1ako",
    cate: "2026 E-commerce Store",
    image: "/p1.png",
    content:
      "以 La1ako品牌為核心，打造一個兼具購物功能與情感體驗的線上空間。網站不僅提供商品展示與購買流程，更透過互動設計、動態效果與細膩的視覺語言，讓使用者在瀏覽過程中感受到品牌所營造的氛圍。藉由層層堆疊的視覺細節與互動回饋，讓網站成為品牌理念的延伸，而不只是商品交易的平台。。",
  },
  {
    id: 2,
    title: "拾遺",
    cate: "2025 Creative Media Design (Interactive Website)",
    image: "/p1.png",
    content:
      "本作品結合陶瓷創作與網頁互動設計，透過數位介面重新詮釋台灣陶瓷的文化脈絡。整體網站分為三大單元：台灣陶瓷的歷史發展、以互動方式呈現的二十款紋樣文化寓意，以及陶瓷製作流程的介紹。使用者可透過點選不同時期或紋樣類別進行互動探索，理解台灣陶瓷如何在時間推移中逐步融合與演變，從泥土的原始狀態走向精緻的器物形式。。",
  },
  {
    id: 3,
    title: "氣息的反饋",
    cate: "2025 Creative Media Design",
    image: "/p1.png",
    content:
      "這是一個穿戴式裝置，透過使用者的呼吸控制裝置收縮，模擬陪伴的感覺。作品源於對孤獨情緒的探索：孤獨不是單一的存在，而是缺席的感受與未被回應的渴望。裝置設計穿戴於頸部與手腕，並融入生活化的元素，如膠布式樣，讓陪伴在日常中自然發生。",
  },
  {
    id: 4,
    title: "共生",
    cate: "2025 Creative Media Design",
    image: "/p1.png",
    content:
      "每隻鳥配有一段旋律，觀者觸碰鳥喙即可觸發音樂。當六隻鳥同時被觸發，六段旋律會組合成完整小樂曲。裝置需要六人協作，概念來自我對於人與人相處的理想狀態：每個人各自不同，卻在同一空間中互相影響、達成平衡。每段旋律，如同每個人的存在，都是不可或缺的。",
  },
  {
    id: 5,
    title: "浮泡",
    cate: "2025 Creative Media Design",
    image: "/p1.png",
    content:
      "本作品以歐根紗作為主要材質，運用其半透明與光線折射所產生的色彩變化特性，發展出由少成多的視覺概念。透過重複堆疊、包覆與綁結的手法，將原本輕薄單一的纖維層層累積，使其逐漸轉化為具有體積感的結構，形成如泡泡般聚集的有機形態。利用光線穿透與流動所產生的視覺變化，使作品在不同觀看角度與光源條件下呈現多層次效果。整體試圖營造介於實體與幻象之間的視覺體驗，使材質本身成為介質，連結空間、光與感知的流動關係。",
  },
];

const activeId = ref(baseProjects[0].id);
const ready = ref(false); // ✅ 進場動畫結束前鎖住 scroll 事件

const activeIndex = computed(() =>
  baseProjects.findIndex((p) => p.id === activeId.value),
);

const getItemHeight = () => {
  const el = container.value;
  if (!el || !el.children.length) return 0;
  return el.children[0].getBoundingClientRect().height;
};

const updateActive = () => {
  const el = container.value;
  if (!el) return;

  const containerBottom = el.getBoundingClientRect().bottom;
  const cards = el.children;
  let closest = null;
  let minDist = Infinity;

  for (let i = 0; i < cards.length; i++) {
    const rect = cards[i].getBoundingClientRect();
    const dist = Math.abs(containerBottom - rect.bottom);
    if (dist < minDist) {
      minDist = dist;
      closest = cards[i];
    }
  }

  const idx = [...cards].indexOf(closest);
  if (idx >= 0) activeId.value = baseProjects[idx].id;
};

let ticking = false;
const onScroll = () => {
  if (!ready.value) return; // ✅ 進場動畫中不處理 scroll
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateActive();
    ticking = false;
  });
};

const scrollToIndex = (index) => {
  const el = container.value;
  if (!el) return;
  const itemHeight = getItemHeight();
  el.scrollTo({ top: index * itemHeight, behavior: "smooth" });
};

const prev = () => {
  if (activeIndex.value <= 0) return;
  scrollToIndex(activeIndex.value - 1);
};

const next = () => {
  if (activeIndex.value >= baseProjects.length - 1) return;
  scrollToIndex(activeIndex.value + 1);
};

const introActive = ref(true);

const playIntro = () => {
  const el = container.value;
  if (!el) return;

  const itemHeight = getItemHeight();
  const lastIndex = baseProjects.length - 1;

  // 先跳到最後一個作品
  el.scrollTop = lastIndex * itemHeight;
  activeId.value = baseProjects[lastIndex].id;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // 🌟 整個畫面從上方掉進來
      introActive.value = false;

      // 🌟 同時作品列表從最後滑回第一個
      el.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      const onScrollEnd = () => {
        activeId.value = baseProjects[0].id;
        ready.value = true;

        el.removeEventListener("scroll", checkEnd);
      };

      let endTimer = null;

      const checkEnd = () => {
        clearTimeout(endTimer);

        endTimer = setTimeout(() => {
          onScrollEnd();
        }, 150);
      };

      el.addEventListener("scroll", checkEnd);
    });
  });
};

onMounted(async () => {
  await nextTick();
  playIntro();
});
</script>

<style scoped>
.pro:nth-child(1) {
  margin-top: 30vh;
}
</style>
