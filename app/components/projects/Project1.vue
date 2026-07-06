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
            src="/project1/cover.png"
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
          La1ako
          起源於手作樹脂創作，並逐漸發展為涵蓋飾品、服飾與生活物件的獨立品牌。作品以透明、輕盈且富有層次感的材質語言為特色，透過手工製作保留每件創作獨有的溫度與個性，將日常物件轉化為承載想像與情感的收藏品。
        </h3>
        <h3 class="w-full">
          網站設計延續品牌夢幻且細膩的特質，透過柔和的視覺語言、互動體驗與內容敘事，打造兼具購物功能與情感連結的數位空間，讓使用者在探索商品的同時，也能感受創作背後的故事與溫度。
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
      <img src="/project1/ia1.png" class="w-full h-full object-cover" />
    </div>
    <div
      class="lg:col-span-2 md:col-span-2 col-span-1 bg-gray-100 aspect-[390/844] overflow-hidden shadow-[0_0_5px_rgba(255,105,180,0.1)]"
    >
      <img src="/project1/ia2.png" class="w-full h-full object-cover" />
    </div>
    <div
      class="lg:col-span-2 md:col-span-2 col-span-1 bg-gray-100 aspect-[390/844] overflow-hidden shadow-[0_0_5px_rgba(255,105,180,0.1)]"
    >
      <img src="/project1/ia3.png" class="w-full h-full object-cover" />
    </div>
    <!-- 第四張：mobile 換行獨佔一格對齊2x2，用 col-start -->
    <div
      class="lg:col-span-2 md:col-span-2 col-span-1 md:col-start-auto lg:col-start-auto bg-gray-100 aspect-[390/844] overflow-hidden shadow-[0_0_5px_rgba(255,105,180,0.1)]"
    >
      <img src="/project1/ia4.png" class="w-full h-full object-cover" />
    </div>
  </div>

  <!-- <div class="grid-layout8 !mb-[var(--margin)]" id="Interface Design">
    <div
      class="lg:col-span-8 md:col-span-6 col-span-3 flex gap-2 flex-col justify-between"
    >
      <h3>
        介面設計延續品牌視覺識別，以溫暖柔和的色彩與插畫元素建立一致的品牌氛圍。<br />透過統一的元件規範、清晰的資訊層級與適當留白，引導使用者專注於商品內容與購買流程，同時兼顧視覺表現與操作效率。
      </h3>
    </div>

    <div
      class="lg:col-span-2 md:col-span-6 col-span-3 flex lg:flex-col flex-row gap-2 md:pr-1 justify-end order-2 lg:order-1"
    >
      <div
        v-for="item in images"
        :key="item.id"
        class="aspect-[16/9] lg:w-1/2 w-full flex cursor-pointer bg-cover bg-center transition-all duration-300"
        :class="current === item.src ? 'opacity-100' : 'opacity-30'"
        :style="{ backgroundImage: `url(${item.src})` }"
        @click="current = item.src"
      >
        {{ item.label }}
      </div>
    </div>
    <div
      class="col-span-3 bg-[var(--Asecondary)] md:col-span-6 aspect-[16/10] overflow-hidden order-1 lg:order-2"
    >
      <img :src="current" class="w-full h-full p-20 object-cover" />
    </div>
  </div> -->

  <div
    class="grid-layout8 justify-end flex items-start sm:flex-row-reverse !my-[var(--margin)]"
  >
    <div
      class="md:col-span-2 col-span-3 gap-3 sm:gap-4 flex flex-col lg:sticky lg:top-12"
    >
      <div class="flex flex-col gap-3 sm:gap-4 justify-between">
        <h3 class="w-full">
          介面設計延續品牌視覺識別，以溫暖柔和的色彩與插畫元素建立一致的品牌氛圍。<br />透過統一的元件規範、清晰的資訊層級與適當留白，引導使用者專注於商品內容與購買流程，同時兼顧視覺表現與操作效率。
        </h3>
      </div>
    </div>
    <div
      class="lg:col-span-6 md:col-span-4 col-span-3 gap-3 sm:gap-4 aspect-[16/9] order-1 md:order-2"
    >
      <img src="/project1/ia.png" alt="" class="w-full h-full object-cover" />
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
          考量 La1ako
          目前仍處於品牌發展初期，商品品項相對精簡，因此網站設計策略並非以大量商品瀏覽與導購為核心，而是著重於品牌氛圍的傳遞與使用者體驗的建立。透過互動設計、視覺敘事與內容編排，引導使用者在瀏覽過程中感受品牌特色，進一步提升停留時間與品牌記憶點。
          在購買流程上，則以降低操作負擔為原則，精簡從商品瀏覽到完成結帳的步驟，減少不必要的決策與跳轉，使使用者能夠快速完成購買，同時保有探索品牌內容與互動體驗的空間。
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
    <!-- 標題：mobile 全寬，tablet 2欄，desktop 1欄 -->
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
        src="/project1/rwd3.png"
        alt=""
        class="w-full object-cover shadow-[0_0_5px_rgba(255,105,180,0.1)]"
      />
    </div>
    <div class="md:col-span-2 col-span-1 col-start-3 gap-4">
      <!-- 大圖：佔 6 欄寬（lg），16:9 -->
      <img
        src="/project1/rwd2.png"
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
        class="col-span-3 md:col-span-1 md:self-start md:sticky md:top-12 relative"
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
        class="col-span-3 md:col-span-1 md:self-start md:sticky md:top-12 relative"
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
          獨立完成電商平台全端開發，採用 Vue、Nuxt、Node.js 與 MySQL
          建立商品管理、購物車、訂單與結帳系統。<br />整合綠界 ECPay 與 PayPal
          金流，實作付款驗證、訂單狀態同步及交易流程管理。系統部署於 VPS，並透過
          Cloudflare 進行網路與效能優化，完成可實際營運的線上商店。
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

useSeoMeta({
  title: "PiPiChouPortfolio",
  description: "Project La1ako",
  ogImage: "/project1/cover.png",
});

const project = {
  title: "La1ako",
  description:
    "以 La1ako 品牌為核心，打造一個兼具購物功能與情感體驗的線上空間。網站不僅提供商品展示與購買流程，更透過互動設計、動態效果與細膩的視覺語言，讓使用者在瀏覽過程中感受到品牌所營造的氛圍。藉由層層堆疊的視覺細節與互動回饋，讓網站成為品牌理念的延伸，而不只是商品交易的平台。",

  roles: ["Product Designer", "UI/UX Designer", "Full-Stack Developer"],

  link: "Website Link",

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
};

const images = [
  {
    id: 1,
    label: "a",
    src: "/a.png",
    bg: "/a.png",
  },
  {
    id: 2,
    label: "b",
    src: "/b.png",
    bg: "/b.png",
  },
  {
    id: 3,
    label: "c",
    src: "/c.png",
    bg: "/b.png",
  },
  {
    id: 4,
    label: "d",
    src: "/d.png",
    bg: "/b.png",
  },
];
async function preloadResources() {
  const videos = ["/project1/interaction1.mp4", "/project1/interaction2.mp4"];

  const images = [
    "/project1/about.jpg",
    "/project1/cover.png",
    "/project1/ia.png",
    "/project1/ia1.png",
    "/project1/ia2.png",
    "/project1/ia3.png",
    "/project1/ia4.png",
    "/project1/rwd1.png",
    "/project1/rwd2.png",
    "/project1/rwd3.png",
    "/project1/p1.png",
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
const current = ref(images[0].src);

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
