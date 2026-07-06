<template>
  <Header />
  <section class="grid-layout8 !items-start !pb-[calc(100vh/4)]">
    <!-- 照片：手機全寬 -->
    <div
      class="md:col-span-1 md:col-start-1 lg:col-span-1 lg:col-start-2 col-span-2 pr-1/2 md:pr-0 w-3/4 sm:w-2/4 md:w-full md:!pt-[calc(100vh/4)] pt-24 md:h-full"
    >
      <div class="md:sticky md:top-[calc(100vh/4+16px)] flex flex-col gap-4">
        <div
          ref="picRef"
          class="chupic md:pr-2"
          style="clip-path: inset(100% 0% 0% 0%)"
        >
          <img src="/chupic.png" alt="" class="w-full" />
        </div>
      </div>
    </div>

    <!-- 關於 label -->
    <div
      class="md:col-span-1 col-span-3 md:text-end md:!mt-[calc(100vh/4)] !mt-0"
    >
      <h3
        ref="labelRef"
        class="mt-[4px]"
        style="opacity: 0; transform: translateY(16px)"
      >
        關於
      </h3>
    </div>

    <!-- 右欄內容：手機 col-span-2，電腦 col-span-4 -->
    <div
      class="md:col-span-4 sm:col-span-3 lg:col-span-4 col-span-3 flex flex-col gap-10 sm:gap-16 md:!mt-[calc(100vh/4)]"
    >
      <!-- 關於我 -->
      <div class="flex gap-3 md:flex-col md:aspect-[12/4] md:justify-between">
        <h3
          ref="nameRef"
          class="font-bold text-xl md:w-auto w-1/3 shrink-0 leading-none"
          style="opacity: 0; transform: translateY(16px)"
        >
          周楚璇
        </h3>
        <div
          class="md:flex-row md:gap-4 flex flex-col gap-3 w-2/3 md:w-auto mt-4"
        >
          <h3 ref="textRef1" class="md:flex-1">
            畢業於實踐大學媒體傳達設計系，具備視覺設計、互動設計與前端開發的複合背景。熟練使用
            Figma 進行 UI 設計，具備建立 Component Library
            與視覺規範的經驗，並能規劃 User Flow
            與互動原型。具備中高級英語能力，在畢業製作期間擔任公關組組員，負責名人講座的整體規劃與執行，培養跨部門溝通、內容策劃與專案統籌能力。
          </h3>
          <h3 ref="textRef2" class="md:flex-1">
            自 2024 年起投入網頁開發實作，主要使用 Vue／Nuxt
            架構，並具備電商網站從需求溝通、UI
            設計到前端開發與正式上線的完整獨立執行經驗。擅長以視覺敘事與使用者體驗思維整合設計與技術，確保產品在視覺一致性與操作流暢度上的品質，致力於打造兼具美感與實用性的數位體驗。
          </h3>
        </div>
      </div>

      <!-- 軟體應用 -->
      <div class="flex gap-3">
        <h3
          ref="softwareTitleRef"
          class="section-title md:w-auto w-1/3 shrink-0"
          style="opacity: 0; transform: translateY(16px)"
        >
          軟體應用
        </h3>
        <div
          ref="softwareGridRef"
          class="grid md:grid-cols-4 grid-cols-2 gap-x-4 gap-y-1 w-2/3 md:w-auto"
          style="opacity: 0; transform: translateY(16px)"
        >
          <h4>Adobe Ai</h4>
          <h4>Adobe Ps</h4>
          <h4>Adobe Id</h4>
          <h4>Adobe Ae</h4>
          <h4>Adobe Pr</h4>
          <h4>Figma</h4>
          <h4>Procreate</h4>
          <h4>Arduino</h4>
          <h4>Nomad</h4>
          <h4>Davinci</h4>
          <h4>Html / Css / Js / Ts</h4>
          <h4>Vue / Nuxt</h4>
          <h4>Tailwind</h4>
          <h4>MySQL</h4>
        </div>
      </div>

      <!-- 語言能力 -->
      <div class="flex gap-3">
        <h3
          ref="langTitleRef"
          class="section-title md:w-auto w-1/3 shrink-0"
          style="opacity: 0; transform: translateY(16px)"
        >
          語言能力
        </h3>
        <div
          ref="langGridRef"
          class="grid md:grid-cols-4 grid-cols-2 gap-y-1 w-2/3 md:w-auto"
          style="opacity: 0; transform: translateY(16px)"
        >
          <h4>英文</h4>
          <h4>TOEIC 735</h4>
          <span /><span />
          <h4>中文</h4>
          <h4>精通</h4>
          <span /><span />
          <h4>日文</h4>
          <h4>基礎</h4>
          <span /><span />
        </div>
      </div>

      <!-- 工作範圍 -->
      <div class="flex gap-3">
        <h3
          ref="workTitleRef"
          class="section-title md:w-auto w-1/3 shrink-0"
          style="opacity: 0; transform: translateY(16px)"
        >
          工作範圍
        </h3>
        <div
          ref="workGridRef"
          class="grid grid-cols-1 gap-y-1 w-2/3 md:w-auto"
          style="opacity: 0; transform: translateY(16px)"
        >
          <h4>插畫</h4>
          <h4>設計</h4>
          <h4>網頁設計</h4>
        </div>
      </div>
    </div>
  </section>

  <div class="relative w-full h-screen overflow-hidden">
    <div
      class="absolute top-0 left-0 w-full h-[20vh] pointer-events-none bg-gradient-to-b z-10 from-white to-transparent"
    ></div>
    <div class="absolute inset-0 z-0">
      <img
        v-for="(a, index) in record"
        :key="index"
        :src="a.pic"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        :class="activeIndex === index ? 'opacity-100' : 'opacity-0'"
      />
    </div>

    <div class="grid-layout8">
      <div class="relative col-span-1 z-10 flex flex-col gap-3 pt-12">
        <h3>演講紀錄</h3>
      </div>
      <div
        class="relative md:col-span-2 md:col-start-3 col-span-2 col-start-2 pt-12 z-10 flex flex-col gap-3"
      >
        <div
          v-for="(a, index) in record"
          :key="index"
          class="cursor-pointer text-white transition-opacity duration-300"
          :class="activeIndex === index ? 'opacity-100' : 'opacity-40'"
          @mouseenter="activeIndex = index"
          @click="activeIndex = index"
        >
          <h5>{{ a.name }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";
import { useTextLineAnimation } from "~/composables/useTextLineAnimation";

const router = useRouter();

const ELLIPSE_D =
  "M219.007 78.5323C275.589 35.7858 356.798 9 447 9C537.202 9 618.388 35.7858 674.993 78.5323V77.8032C790.986 77.8032 885 143.088 885 223.635C885 304.183 790.986 369.468 674.993 369.468C618.411 412.214 537.225 439 447.023 439C356.821 439 275.634 412.214 219.03 369.468C103.014 369.468 9 304.167 9 223.635C9 143.104 103.014 77.8032 219.007 77.8032V78.5323Z";

/* ── refs ── */
const picRef = ref(null);
const labelRef = ref(null);
const nameRef = ref(null);
const textRef1 = ref(null);
const textRef2 = ref(null);
const softwareTitleRef = ref(null);
const softwareGridRef = ref(null);
const langTitleRef = ref(null);
const langGridRef = ref(null);
const workTitleRef = ref(null);
const workGridRef = ref(null);
const svgPath = ref(null);
const svgText = ref(null);

/* ── text line animations ── */
const anim1 = useTextLineAnimation(textRef1, { stagger: 0.04, delay: 0.3 });
const anim2 = useTextLineAnimation(textRef2, { stagger: 0.04, delay: 0.4 });

/* ── float up helper ── */
function floatUp(el, delay = 0) {
  if (!el) return;
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
    delay,
  });
}

/* ── svg 動畫 ── */
// function animateSvg(delay = 0) {
//   const path = svgPath.value;
//   const text = svgText.value;
//   if (!path || !text) return;

//   const len = path.getTotalLength();
//   path.style.strokeDasharray = String(len);
//   path.style.strokeDashoffset = String(len);
//   path.style.stroke = "transparent";
//   path.style.fill = "transparent";
//   path.style.transition = "none";
//   text.style.opacity = "0";

//   setTimeout(() => {
//     // 1. 畫線條
//     path.style.stroke = "black";
//     path.style.transition =
//       "stroke 0ms, stroke-dashoffset 800ms cubic-bezier(0.4,0,0.2,1)";
//     path.style.strokeDashoffset = "0";

//     setTimeout(() => {
//       // 2. 填滿黑色
//       path.style.transition = "fill 400ms ease";
//       path.style.fill = "black";

//       setTimeout(() => {
//         // 3. 文字淡入
//         text.style.transition = "opacity 500ms ease";
//         text.style.opacity = "1";
//       }, 400);
//     }, 900);
//   }, delay * 1000);
// }

/* ── navigateTo ── */
// function navigateTo(to) {
//   router.push(to);
// }

onMounted(async () => {
  gsap.set(textRef1.value, { opacity: 0 });
  gsap.set(textRef2.value, { opacity: 0 });
  floatUp(nameRef.value, 0);

  await new Promise((resolve) => setTimeout(resolve, 500));

  gsap.to(picRef.value, {
    clipPath: "inset(0% 0% 0% 0%)",
    duration: 0.8,
    ease: "power2.inOut",
  });

  floatUp(labelRef.value, 0);
  floatUp(softwareTitleRef.value, 0);
  floatUp(softwareGridRef.value, 0);
  floatUp(langTitleRef.value, 0);
  floatUp(langGridRef.value, 0);
  floatUp(workTitleRef.value, 0);
  floatUp(workGridRef.value, 0);

  anim1.run();
  anim2.run();

  animateSvg(0.5);
});

const activeIndex = ref(0);

const record = [
  {
    name: "陳敬恆｜赤燭遊戲 美術總監",
    content: "獨立遊戲創作：從視覺建構世界觀",
    pic: "/lecture/l1.png",
  },
  {
    name: "林思翰｜Group.G AI 文化科技導演",
    content: "生成未來：AI導演的敘事實驗與業介現象",
    pic: "/lecture/l2.png",
  },
  {
    name: "陳念瑩｜[ 2022 金曲獎 ] 最佳裝幀設計獎設計師",
    content: "自由創作者的自學與自立之路：創作如何成為職涯？",
    pic: "/lecture/l3.png",
  },
];
</script>

<style scoped>
h4 {
  line-height: 1.3;
}
h3 {
  line-height: 1.5;
  letter-spacing: 0.5px;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
