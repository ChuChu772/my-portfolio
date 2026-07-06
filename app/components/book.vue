<template>
  <Teleport to="body">
    <div class="overlay">
      <div v-if="showBook" class="modal" :class="{ ready: bookReady }">
        <div class="click-left" @click="prevPage" />
        <div class="click-right" @click="nextPage" />

        <div ref="bookRef" class="book">
          <div class="page cover"><img src="/book/book1.webp" alt="" /></div>
          <div class="page">
            <div class="maskl"></div>
            <img src="/book/book2.webp" alt="" />
          </div>
          <div class="page">
            <div class="maskr"></div>
            <img src="/book/book3.webp" alt="" />
          </div>
          <div class="page">
            <div class="maskl"></div>
            <p
              class="absolute top-0 left-0 p-2 md:text-[7px] text-[4px] leading-none"
            >
              Illustration Series
            </p>
            <img src="/book/book4.webp" alt="" />
          </div>
          <div class="page">
            <div class="maskr"></div>
            <img src="/book/book5.webp" alt="" />
          </div>
          <div class="page">
            <div class="maskl"></div>
            <p
              class="absolute top-0 left-0 p-2 md:text-[7px] text-[4px] leading-none"
            >
              Illustration Series
            </p>
            <img src="/book/book6.webp" alt="" />
          </div>
          <div class="page">
            <div class="maskr"></div>
            <img src="/book/book7.webp" alt="" />
          </div>
          <div class="page">
            <div class="maskl"></div>
            <p
              class="absolute top-0 left-0 p-2 md:text-[7px] text-[4px] leading-none"
            >
              Illustration Series
            </p>
            <img src="/book/book8.webp" alt="" />
          </div>
          <div class="page">
            <div class="maskr"></div>
            <img src="/book/book9.webp" alt="" />
          </div>
          <div class="page">
            <div class="maskl"></div>
            <p
              class="absolute top-0 left-0 p-2 md:text-[7px] text-[4px] leading-none"
            >
              Illustration Series
            </p>
            <img src="/book/book10.webp" alt="" />
          </div>
          <div class="page">
            <div class="maskr"></div>
            <img src="/book/book11.webp" alt="" />
          </div>
          <div class="page">
            <img src="/book/book12.webp" alt="" />
          </div>
          <div class="page back-cover">
            <h3
              class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-4 text-[7px] leading-none flex leading-normal text-center flex-col gap-1"
            >
              This is the last page of the book. Thank you for reading !
              <br /><br />© 2024 PiPiChou
            </h3>
          </div>
        </div>
      </div>

      <Transition
        name="cover-slide"
        @after-leave="onCoverFullyGone"
        @after-enter="onCoverReturned"
      >
        <div
          v-show="showCover"
          ref="coverRef"
          class="floating-cover"
          :class="{ 'at-rest': coverArrived }"
          @click="openBook"
          @transitionend="onCoverArrived"
        >
          <slot name="cover">
            <img src="/book/book1.webp" alt="" />
          </slot>
          <span class="hint" v-if="!coverArrived">點擊翻開</span>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from "vue";

const bookRef = ref(null);
const showCover = ref(true); // ← 掛載就顯示封面
const coverArrived = ref(false);
const showBook = ref(false);
const bookReady = ref(false);

let pageFlip = null;
let PageFlipClass = null;
let isReturning = false; // 是否處於「翻回封面 → floating-cover 滑回中間」流程
let arrivedHandled = false; // 是否處於「點擊滑出去」流程

async function loadPageFlip() {
  if (PageFlipClass) return PageFlipClass;
  const mod = await import("page-flip");
  PageFlipClass = mod.PageFlip || mod.default?.PageFlip;
  return PageFlipClass;
}

async function initFlip() {
  const el = bookRef.value;
  if (!el) {
    console.log("initFlip: bookRef is null");
    return;
  }

  if (pageFlip) {
    pageFlip.destroy();
    pageFlip = null;
  }

  await nextTick();
  await new Promise((r) => requestAnimationFrame(r));

  const width = el.clientWidth;
  const height = el.clientHeight;
  if (!width || !height) return;
  console.log("initFlip size:", width, height);

  const PageFlip = await loadPageFlip();
  console.log("PageFlip loaded:", PageFlip);

  pageFlip = new PageFlip(el, {
    width,
    height,
    size: "fixed",
    autoSize: false,
    showCover: true,
    usePortrait: false,
    drawShadow: false,
    flippingTime: 1000,
    mobileScrollSupport: false,
  });

  pageFlip.loadFromHTML(el.querySelectorAll(".page"));

  pageFlip.on("flip", (e) => {
    if (e.data === 0) {
      returnToCover();
    }
  });
}

function openBook() {
  console.log("openBook clicked");
  coverArrived.value = true;
  prepareBookBehindCover();
}

async function prepareBookBehindCover() {
  showBook.value = true;
  bookReady.value = false;

  await nextTick();
  await new Promise((r) => requestAnimationFrame(r));

  await initFlip();
}

function onCoverArrived() {
  if (isReturning) {
    if (coverArrived.value) return;
    isReturning = false;

    showBook.value = false;
    if (pageFlip) {
      pageFlip.destroy();
      pageFlip = null;
    }
    return;
  }

  if (arrivedHandled) return;
  arrivedHandled = true;

  bookReady.value = true;

  requestAnimationFrame(() => {
    showCover.value = false;
  });
}

function onCoverFullyGone() {
  arrivedHandled = false;
  coverArrived.value = false;

  pageFlip?.flipNext();
}

// 翻到第 0 頁：只負責讓 cover 出現在蓋住書本的位置，
// book 消失的時機交給下面的 watch(showCover) 判斷，
// 確保「畫面上真的已經看到 cover」之後才讓 book 消失。
function returnToCover() {
  if (isReturning) return;
  isReturning = true;

  coverArrived.value = true; // 直接帶上覆蓋書本的位移
  showCover.value = true; // 觸發 v-show 顯示（不再是重新建立 DOM）
}

// v-show 讓節點常駐 DOM，這裡改用 watch 取代原本的 @vue:mounted，
// 搭配雙重 requestAnimationFrame，等瀏覽器真的畫出這一幀後才讓 book 消失。
watch(showCover, (val) => {
  if (val && isReturning) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bookReady.value = false;
      });
    });
  }
});

function onCoverReturned() {
  if (!isReturning) return;

  requestAnimationFrame(() => {
    coverArrived.value = false;
  });
}

onMounted(() => {
  loadPageFlip();
});

function nextPage() {
  pageFlip?.flipNext();
}
function prevPage() {
  pageFlip?.flipPrev();
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.5s ease-out forwards;
}

.modal {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
}
.modal.ready {
  opacity: 1;
}

.floating-cover {
  --cover-rest-x: clamp(90px, 12.5vw, 150px);

  position: absolute;
  width: clamp(180px, 25vw, 300px);
  height: clamp(300px, 41.667vw, 500px);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  z-index: 20;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  /* 讓手機瀏覽器提早建立合成層，減少臨時建圖層造成的那一幀延遲/閃爍 */
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.floating-cover.at-rest {
  transform: translateX(var(--cover-rest-x));
}

.floating-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hint {
  position: absolute;
  bottom: -28px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.05em;
}

.cover-slide-leave-active {
  transition: transform 0.01s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
}
.cover-slide-leave-to {
  /* 跟 .at-rest 用同一個變數，避免兩個 class 搶同一個 transform 時數值不一致造成跳動 */
  transform: translateX(var(--cover-rest-x));
}

.cover-slide-enter-active {
  transition: none;
}
.cover-slide-enter-from {
  /* 同上，統一用同一個變數，確保進場那一幀就已經是「蓋住書本」的正確位置 */
  transform: translateX(var(--cover-rest-x));
}

.book {
  position: relative;
  width: clamp(180px, 25vw, 300px);
  height: clamp(300px, 41.667vw, 500px);
  flex: 0 0 auto;

  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.page img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cover,
.back-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #ffffff;
}

.click-left,
.click-right {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: 100;
}
.click-left {
  left: 0;
  cursor: w-resize;
}
.click-right {
  right: 0;
  cursor: e-resize;
}

.maskr {
  position: absolute;
  top: 0;
  left: 0;
  width: 2.5rem;
  height: 100%;
  border-left: 1px solid rgba(105, 116, 31, 0.2);
  background: linear-gradient(to right, rgba(105, 116, 31, 0.1), transparent);
}
.maskl {
  position: absolute;
  top: 0;
  left: 0;
  width: 5rem;
  height: 100%;
  background: linear-gradient(to right, rgba(105, 116, 31, 0.05), transparent);
}
</style>
