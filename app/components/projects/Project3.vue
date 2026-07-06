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
            src="/project3/b1.webp"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>

  <div
    class="grid-layout8 justify-end items-end flex !mt-[var(--margin)] !pb-0"
    id="Visual Concept Development"
  >
    <div class="lg:col-span-5 md:col-span-4 col-span-2 gap-4 flex flex-col">
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">01 . 01</h5>
        <h4 class="">Visual Concept Development</h4>
      </div>
      <div class="flex gap-4 justify-between">
        <h3 class="w-full">
          「我憎恨孤獨的感覺，憎恨那個渴望陪伴的自己。」<br />
          這是創作發想之初，盤踞在我心底的念頭。我曾相信孤單是懦弱的徵兆，相信所有關係裡的裂縫與爭吵，都源於自己不夠堅強。我渴望成為一個不需要依賴的人，然而這樣的期許，卻不斷與現實中真實的自己撕扯、對峙。
        </h3>
      </div>
    </div>
  </div>

  <div
    class="grid-layout8 justify-end items-end flex sm:flex-row-reverse !mb-[var(--margin)]"
    id="Visual Concept Development"
  >
    <div
      class="lg:col-span-3 md:col-span-2 col-span-3 gap-4 flex flex-col order-2 md:order-1"
    >
      <h3 class="w-full">
        當我開始真正凝視「孤獨」這個情緒，試著不再迴避它，我慢慢明白，孤獨不是「1」的狀態，而是「2」的缺席。
        它不是一種匱乏的本質，而是一種關係的餘震，是期待回應卻落入沉默時，身體所留下的殘響。<br />
        於是我開始思考：在得不到回應的處境裡，陪伴還能以什麼形式存在？<br />
        作品《氣息的反饋》由此誕生。我讓自己的呼吸成為媒介，當外部的回應缺席，呼吸作為最原始、最持續的生命信號，成為一種自我擁抱的方式。不需要等待另一個人，你的身體本身就在回應你。
      </h3>
    </div>
    <div
      class="lg:col-span-5 md:col-span-4 col-span-3 gap-4 aspect-[16/9] order-1 md:order-2"
    >
      <img src="/project3/b2.webp" alt="" class="w-full h-full object-cover" />
    </div>
  </div>

  <div
    class="grid-layout8 justify-start items-start flex sm:flex-row-reverse my-[var(--margin)]"
    id="Visual Concept Development"
  >
    <div
      class="md:col-span-2 lg:col-start-2 col-span-3 md:col-start-1 gap-4 flex flex-col md:sticky md:top-1/2 md:-translate-y-1/"
    >
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">01 . 02</h5>
        <h4 class="">Graphic System Design</h4>
      </div>
      <div class="flex gap-4 justify-between">
        <h3 class="w-full">
          作品共發展出三種樣式，分別對應頸部與手腕的穿戴形式。其中一款參照了醫療膠布的結構語言——既想傳遞它作為急救物件的隱喻（我們時常需要在情感上為自己急救），也希望這個設計能夠無縫融入日常，成為一種隨身攜帶的、細微的自我照護。
        </h3>
      </div>
    </div>
    <div
      class="lg:col-span-3 lg:col-start-5 md:col-span-2 flex flex-col col-span-3 gap-4 items-center"
    >
      <img src="/project3/b3.webp" alt="" class="w-full h-full object-cover" />
      <img src="/project3/b5.webp" alt="" class="w-full h-full object-cover" />
    </div>
  </div>

  <div
    class="grid-layout8 !mb-[var(--margin)] justify-end items-end flex"
    id="Interaction Design"
  >
    <div class="lg:col-span-3 md:col-span-3 col-span-3 gap-4 flex flex-col">
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">01 . 03</h5>
        <h4>Interaction Design</h4>
      </div>
      <div class="flex gap-4 justify-between">
        <h3 class="w-full">
          系統以 Arduino Uno
          為控制核心，透過聲音傳感器擷取環境聲響，並依據感測結果控制 L298N
          馬達驅動模組與電磁閥。<br />當偵測到聲音訊號時，系統啟動充氣馬達並開啟氣體通道，使氣囊膨脹；當訊號消失時，系統切換至抽氣模式，將氣體回收並使裝置恢復原始狀態。整體控制流程包含聲音感測、訊號判斷、氣動控制與機械運動輸出四個階段。
        </h3>
      </div>
    </div>

    <div
      class="lg:col-span-5 lg:col-start-4 md:col-span-3 md:col-start-4 col-span-3 col-start-1 aspect-[16/9]"
    >
      <img src="/project3/b4.webp" alt="" class="w-full h-full object-cover" />
    </div>
  </div>

  <div class="grid-layout8 my-[var(--margin)] justify-start items-start">
    <div class="col-span-1 gap-4 flex flex-col">
      <div class="gap-2 flex">
        <h5 class="tracking-[0.95px]">02 . 01</h5>
        <h4 class="">Project Showcase Video</h4>
      </div>
    </div>

    <!-- 縮圖預覽：自動播放 + loop 的 Vimeo -->
    <div
      class="col-span-6 w-full aspect-[16/9] bg-black cursor-pointer overflow-hidden"
      @click="openModal"
    >
      <iframe
        ref="previewRef"
        class="w-full h-full object-contain pointer-events-none"
        :src="previewSrc"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
      />
    </div>

    <!-- Modal：用 v-show 讓它一直存在、預先載入 -->
    <Teleport to="body">
      <div
        v-show="open"
        class="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center transition-opacity duration-300"
        :class="
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        "
        @click.self="close"
      >
        <div class="w-full max-w-6xl h-[80vh] relative bg-black group">
          <iframe
            ref="vimeoRef"
            class="w-full h-full object-contain"
            :src="vimeoSrc"
            frameborder="0"
            allow="autoplay; fullscreen"
          />

          <!-- 你的 UI 完全不變 -->
          <div
            class="absolute bottom-0 left-0 w-full px-4 py-4 bg-gradient-to-t from-black/90 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div class="w-full flex justify-between pb-4">
              <h4>{{ formatTime(currentTime) }}</h4>
              <h4>{{ formatTime(duration) }}</h4>
            </div>

            <div
              class="relative w-full h-[2px] bg-white/20 rounded-full cursor-pointer mb-4"
            >
              <div
                class="absolute top-0 left-0 h-full bg-white rounded-full"
                :style="{ width: `${(currentTime / duration) * 100}%` }"
              />
              <input
                type="range"
                min="0"
                :max="duration"
                step="0.01"
                v-model="currentTime"
                @input="seek"
                class="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
              />
            </div>

            <div
              class="flex items-center gap-6 text-xs tracking-widest uppercase select-none"
            >
              <button
                class="hover:opacity-60 transition-opacity font-light"
                @click="togglePlay"
              >
                <h4>{{ isPlaying ? "Pause" : "Play" }}</h4>
              </button>
              <div class="flex-1" />
              <button
                class="hover:opacity-60 transition-opacity font-light w-14 text-right"
                @click="toggleMute"
              >
                <h4>{{ muted ? "Unmute" : "Mute" }}</h4>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Player from "@vimeo/player";
import ProjectLayout from "~/components/ProjectLayout.vue";

gsap.registerPlugin(ScrollTrigger);

const project = {
  title: "氣息的反饋",
  description:
    "這是一個穿戴式裝置，透過使用者的呼吸控制裝置收縮，模擬陪伴的感覺。作品源於對孤獨情緒的探索：孤獨不是單一的存在，而是缺席的感受與未被回應的渴望。裝置設計穿戴於頸部與手腕，並融入生活化的元素，如膠布式樣，讓陪伴在日常中自然發生。",
  roles: ["Creative Designer", "UI/UX Designer", "Full-Stack Developer"],
  link: "",
  sections: [
    {
      id: "01",
      title: "Creative Media Design",
      items: [
        "Visual Concept Development",
        "Graphic System Design",
        "Interaction Design",
      ],
    },
    {
      id: "02",
      title: "2024 Final Project",
      items: ["Project Showcase Video"],
    },
  ],
};

async function preloadResources() {
  const images = [
    "/project3/b1.webp",
    "/project3/b2.webp",
    "/project3/b3.webp,",
    "/project3/b4.webp",
    "/project3/b5.webp",
    "/project4/cover.webp",
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

const imgWrapRef = ref(null);
const imgRef = ref(null);

const vimeoId = "1207309445";

const previewRef = ref(null);
const previewSrc = `https://player.vimeo.com/video/${vimeoId}?background=1&muted=1&autoplay=1&loop=1&controls=0`;
let previewPlayer = null;

const open = ref(false);
const vimeoRef = ref(null);
const vimeoSrc = `https://player.vimeo.com/video/${vimeoId}?muted=1&autoplay=0&controls=0`;

const isPlaying = ref(false);
const muted = ref(true);
const currentTime = ref(0);
const duration = ref(0);

let player = null;

onMounted(() => {
  preloadResources();
  if (imgWrapRef.value && imgRef.value) {
    gsap.from(imgWrapRef.value, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1.2,
      ease: "power2.out",
    });
    gsap.from(imgRef.value, {
      scale: 1.2,
      duration: 1.2,
      ease: "power2.out",
    });
  }

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

  // 一進頁面就把兩個 Vimeo player 都建立、預先載入好
  nextTick(() => {
    initPreviewPlayer();
    initVimeoPlayer();
  });
});

onUnmounted(() => {
  previewPlayer?.unload();
  previewPlayer = null;
  player?.unload();
  player = null;
});

function initPreviewPlayer() {
  if (previewPlayer || !previewRef.value) return;
  previewPlayer = new Player(previewRef.value);
  // background=1 模式會自動 autoplay + loop，不需要額外控制
}

function initVimeoPlayer() {
  if (player || !vimeoRef.value) return; // 只建立一次

  player = new Player(vimeoRef.value);

  player.getDuration().then((d) => {
    duration.value = d;
  });

  player.on("timeupdate", (data) => {
    currentTime.value = data.seconds;
  });

  player.on("play", () => (isPlaying.value = true));
  player.on("pause", () => (isPlaying.value = false));
}

function openModal() {
  open.value = true;
  player?.play();
}

function close() {
  open.value = false;
  player?.pause();
}

function togglePlay() {
  if (!player) return;
  if (isPlaying.value) player.pause();
  else player.play();
}

function toggleMute() {
  if (!player) return;
  const next = !muted.value;
  player.setMuted(next).then(() => {
    muted.value = next;
  });
}

function seek(e) {
  if (!player) return;
  const t = Number(e.target.value);
  player.setCurrentTime(t).then(() => {
    currentTime.value = t;
  });
}

function formatTime(sec) {
  const m = Math.floor(sec / 60) || 0;
  const s = Math.floor(sec % 60) || 0;
  return `${m}:${String(s).padStart(2, "0")}`;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
