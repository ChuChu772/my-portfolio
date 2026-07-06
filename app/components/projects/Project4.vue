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
          「共生」延伸自我先前的聲音裝置創作。當時的作品以鐵環與釣魚線構成，透過馬達低速牽動，使鐵環在持續循環中彼此輕微碰撞，產生細碎而節制的聲響。這種聲音並不強烈，而是帶有一種近似對話的節奏——像是「碰到了」「借過一下」般的輕聲互動。它讓我開始思考：若人與人同處於一個共享空間中，理想的關係是否可以是一種不侵略、彼此讓位的共存狀態。
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
          基於這個運作邏輯，我進一步將感知從機械結構延伸至身體互動，發展出《共生》。作品以六隻陶製鳥為載體，每一隻鳥的喙部皆以金屬結構延伸，使其具備導電性。觀者透過觸碰鳥喙參與作品，進而觸發對應的旋律片段。每隻鳥皆對應一段獨立旋律，當個別被觸發時，聲音以片段的形式存在；而當六隻鳥同時被觸發時，這些旋律便會相互交織，形成一首完整的樂曲。
        </h3>
        <h3 class="w-full">
          這樣的互動機制使作品必須透過多人共同參與才能完整成立，也讓聲音不再只是單純的聆聽對象，而成為人與人之間關係的媒介。作品將聲音拆解為彼此依存的單位，每一個人的參與都是不可取代的一部分。對我而言，理想的共生並非追求一致，而是在差異之中互相影響、彼此調節，在共享的空間裡共同構成一個完整而平衡的整體。
        </h3>
      </div>
    </div>

    <div
      class="lg:col-span-8 sm:col-span-6 col-span-3 md:flex-row md:col-span-6 col-span-3 flex flex-col gap-4 items-stretch mb-[var(--margin)]"
    >
      <!-- 左側大圖 -->
      <div class="flex-1">
        <img src="/project4/p44.webp" class="w-full h-full object-cover" />
      </div>
      <!-- 右側兩張上下疊 -->
      <div class="flex-1 flex gap-4">
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
          作品以即燒陶土製作六隻鳥的造型，並於鳥喙部位結合鐵絲與金屬螺絲作為導電觸點。當使用者接觸鳥喙時，人體形成導電迴路，觸發訊號傳送至
          Makey Makey 感測裝置。 <br />
          Makey Makey 將接收到的導電訊號轉換為鍵盤輸入訊號，並傳送至電腦端。
          <br />
          透過 Ableton Live 的 Key Mapping
          功能，將各組鍵盤訊號分別對應至不同音軌與聲音素材。 <br />
          <br />
          系統共配置六組獨立觸發通道，每隻鳥皆對應一組聲音輸出。當多個觸點同時被觸發時，Ableton
          Live 會同步播放對應音軌，形成多聲部的聲音組合與即時互動效果。
          整體技術架構由導電觸點、Makey Makey 感測器、電腦輸入系統及 Ableton
          Live 音訊控制流程所組成，將實體觸碰行為轉換為即時聲音輸出。
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProjectLayout from "~/components/ProjectLayout.vue";

useSeoMeta({
  title: "共生",
  description: "PiPiChouPortfolio",
  ogImage: "/project4/cover.webp",
});

const project = {
  title: "共生",
  description:
    "每隻鳥配有一段旋律，觀者觸碰鳥喙即可觸發音樂。當六隻鳥同時被觸發，六段旋律會組合成完整小樂曲。裝置需要六人協作，概念來自我對於人與人相處的理想狀態：每個人各自不同，卻在同一空間中互相影響、達成平衡。每段旋律，如同每個人的存在，都是不可或缺的。",

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
};
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
