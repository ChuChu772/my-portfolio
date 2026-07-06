<template>
  <div ref="stageRef" class="goo-stage">
    <svg
      :viewBox="`0 0 ${size.width} ${size.height}`"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="goo" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur
            ref="gooBlurRef"
            in="SourceGraphic"
            :stdDeviation="gooStdDeviation"
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 22 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>

        <radialGradient id="g-a" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stop-color="#C8D1C3" />
        </radialGradient>
        <radialGradient id="g-b" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stop-color="#C8D1C3" />
        </radialGradient>
        <radialGradient id="g-c" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stop-color="#C8D1C3" />
          <stop offset="100%" stop-color="#C8D1C3" />
        </radialGradient>
        <radialGradient id="g-d" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stop-color="#C8D1C3" />
          <stop offset="100%" stop-color="#C8D1C3" />
        </radialGradient>

        <radialGradient id="g-e" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stop-color="#9DA499" />
          <stop offset="100%" stop-color="#9DA499" />
        </radialGradient>
        <radialGradient id="g-f" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stop-color="#9DA499" />
          <stop offset="100%" stop-color="#9DA499" />
        </radialGradient>
        <radialGradient id="g-g" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stop-color="#9DA499" />
          <stop offset="100%" stop-color="#9DA499" />
        </radialGradient>
      </defs>
      <filter id="blurB" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur ref="blurBRef" :stdDeviation="layerBlurStdDeviation" />
      </filter>

      <g :filter="useGooFilter ? 'url(#goo)' : null">
        <g ref="layerARef" :filter="useLayerBlur ? 'url(#blurB)' : null"></g>
        <g ref="layerBRef" :filter="useLayerBlur ? 'url(#blurB)' : null"></g>
      </g>
    </svg>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  onMounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
} from "vue";
import gsap from "gsap";
import { useEntranceController } from "@/composables/Useentrancecontroller";

const { registerGooDisperse } = useEntranceController();

const stageRef = ref(null);
const layerARef = ref(null);
const layerBRef = ref(null);
const gooBlurRef = ref(null);
const blurBRef = ref(null);
const NS = "http://www.w3.org/2000/svg";

const size = reactive({ width: 700, height: 700 });

// ---------- 裝置能力偵測（決定要不要放輕特效） ----------
// 注意：這幾個值故意先給「桌機預設值」，真正的偵測在 onMounted 裡的
// detectDevice() 執行，確保一定是在瀏覽器環境、畫面真正掛載之後才判斷，
// 不會被 SSR（此時沒有 window）或程式碼執行時機問題誤判成桌機。
const isMobile = ref(false);
let isCoarsePointerFlag = false; // 給 setupFollow / pointer 事件判斷用

// goo 效果的模糊半徑：桌機清晰厚重，手機大幅降低運算量
// （SVG feGaussianBlur 在多數手機瀏覽器是走 CPU/軟體光柵化，半徑越大越貴）
const gooStdDeviation = ref(30);
const layerBlurStdDeviation = ref(35);

// const useGooFilter = computed(() => gooStdDeviation.value > 0);
const useGooFilter = computed(
  () => !isMobile.value && gooStdDeviation.value > 0,
);

// 重要：feGaussianBlur 的 stdDeviation="0" 在部分手機瀏覽器（尤其 WebKit）
// 有個 bug，濾鏡輸出會直接變透明，而不是「不模糊、正常顯示原圖」。
// 所以當數值是 0 的時候，直接不套用這層 filter，而不是套用 stdDeviation=0 的 filter，
// 這樣既避開 bug，也順便再省一點運算。
const useLayerBlur = computed(() => layerBlurStdDeviation.value > 0);

// 手機上每層 blob 少放一點，動畫更新的路徑數量直接減半
// -- 折衷版：從 2 顆調成 3 顆，goo 融合感比較夠，但還是比桌機的 4/5 顆輕 --
// 想改回最省效能的版本，把這行數字換回 2
const MOBILE_MAX_BLOBS_PER_LAYER = 3;

// 這幾個會依偵測結果在 detectDevice() 裡被重新賦值，
// 用 let 而不是 const 是因為要等瀏覽器環境確定後才能決定真正的值
let BLOB_POINTS = 16;
let RESIZE_DEBOUNCE = 150;

let tweens = [];
let resizeObserver = null;
let resizeTimer = null;
let followA = null;
let followB = null;
let hasDispersed = false; // 是否已經播放過「散開」動畫
let isDispersing = false; // 散開動畫「正在播放中」，避免被 resize 打斷

// instancesA / instancesB 存放每顆 blob 的完整狀態，
// 才能在 disperse() 的時候精準地 kill 掉「聚集階段」的漂浮 tween、換成散開動畫
let instancesA = [];
let instancesB = [];

// ---------- 形狀產生 ----------
function getPoints(cx, cy, radii) {
  const n = radii.length;
  return radii.map((r, i) => {
    const angle = (i / n) * Math.PI * 2;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  });
}

function pointsToPath(points, tension = 6) {
  const n = points.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const cp1x = p1[0] + (p2[0] - p0[0]) / tension;
    const cp1y = p1[1] + (p2[1] - p0[1]) / tension;
    const cp2x = p2[0] - (p3[0] - p1[0]) / tension;
    const cp2y = p2[1] - (p3[1] - p1[1]) / tension;
    if (i === 0) d += `M ${p1[0].toFixed(2)} ${p1[1].toFixed(2)} `;
    d += `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `;
  }
  return d + "Z";
}

// 手機上用比較少的控制點畫 blob（8 點 vs 16 點），
// path 資料量減半，attr:{d:...} 逐幀重算的成本也跟著降低
// （實際數值由 detectDevice() 在 onMounted 時決定，見上方 let BLOB_POINTS）

function circlePath(cx, cy, r, numPoints = BLOB_POINTS) {
  const radii = new Array(numPoints).fill(r);
  return pointsToPath(getPoints(cx, cy, radii));
}

function blobPath(
  cx,
  cy,
  r,
  numPoints = BLOB_POINTS,
  variance = 0.18,
  seed = 0,
) {
  const radii = [];
  for (let i = 0; i < numPoints; i++) {
    const wobble = Math.sin(i * 2 + seed);
    radii.push(r * (1 + wobble * variance));
  }
  return pointsToPath(getPoints(cx, cy, radii));
}

// ---------- 兩層各自的 blob 設定（都用百分比，是「散開後」的最終位置） ----------
const blobsAFull = [
  {
    xPct: 22,
    yPct: 24,
    rPct: 8,
    fill: "url(#g-a)",
    seed: 0.4,
    morphDur: 2.4,
    floatDur: 5.2,
    dxPct: 30,
    dyPct: 40,
  },
  {
    xPct: 78,
    yPct: 10,
    rPct: 7,
    fill: "url(#g-b)",
    seed: 2.1,
    morphDur: 2.1,
    floatDur: 10,
    dxPct: -40,
    dyPct: 6,
  },
  {
    xPct: 26,
    yPct: 74,
    rPct: 8,
    fill: "url(#g-c)",
    seed: 4.0,
    morphDur: 2.8,
    floatDur: 6.0,
    dxPct: 70,
    dyPct: -30,
  },
  {
    xPct: 74,
    yPct: 76,
    rPct: 8,
    fill: "url(#g-d)",
    seed: 5.6,
    morphDur: 2.2,
    floatDur: 4.9,
    dxPct: -40,
    dyPct: -40,
  },
];

const blobsBFull = [
  {
    xPct: 10,
    yPct: 40,
    rPct: 8,
    fill: "url(#g-e)",
    seed: 1.2,
    morphDur: 2.6,
    floatDur: 5.6,
    dxPct: 70,
    dyPct: 40,
  },
  {
    xPct: 85,
    yPct: 58,
    rPct: 6.5,
    fill: "url(#g-f)",
    seed: 3.3,
    morphDur: 2.1,
    floatDur: 4.7,
    dxPct: -40,
    dyPct: -20,
  },
  {
    xPct: 50,
    yPct: 75,
    rPct: 7,
    fill: "url(#g-g)",
    seed: 5.0,
    morphDur: 2.5,
    floatDur: 5.1,
    dxPct: -40,
    dyPct: -20,
  },
  {
    xPct: 70,
    yPct: 25,
    rPct: 7,
    fill: "url(#g-g)",
    seed: 5.0,
    morphDur: 2.5,
    floatDur: 5.1,
    dxPct: -50,
    dyPct: 20,
  },
  {
    xPct: 30,
    yPct: 35,
    rPct: 7,
    fill: "url(#g-g)",
    seed: 5.0,
    morphDur: 2.5,
    floatDur: 5.1,
    dxPct: 80,
    dyPct: -10,
  },
];

// 手機版直接裁掉多餘的 blob，減少同時跑的 tween 數量
// 實際會不會裁切，要等 detectDevice() 判斷出 isMobile 後才決定（見下方 onMounted）
let blobsA = blobsAFull;
let blobsB = blobsBFull;

function toAbs(b) {
  const minSide = Math.min(size.width, size.height);
  return {
    cx: (b.xPct / 100) * size.width,
    cy: (b.yPct / 100) * size.height,
    r: (b.rPct / 100) * minSide,
    dx: (b.dxPct / 100) * minSide,
    dy: (b.dyPct / 100) * minSide,
  };
}

function killTweens() {
  tweens.forEach((t) => t?.kill());
  tweens = [];
}

function clearLayers() {
  if (layerARef.value) layerARef.value.innerHTML = "";
  if (layerBRef.value) layerBRef.value.innerHTML = "";
  instancesA = [];
  instancesB = [];
}

// 啟動「散開後」的最終漂浮循環（繞著指定位置小範圍漂浮）
function startFinalFloat(inst) {
  const floatTween = gsap.to(inst.path, {
    x: inst.abs.dx,
    y: inst.abs.dy,
    duration: inst.b.floatDur,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
  inst.floatTween = floatTween;
  tweens.push(floatTween);
}

function buildBlob(layerEl, b, i, total, phase) {
  const abs = toAbs(b);
  const centerX = size.width / 2;
  const centerY = size.height / 2;
  const minSide = Math.min(size.width, size.height);

  const path = document.createElementNS(NS, "path");
  path.setAttribute("d", circlePath(abs.cx, abs.cy, abs.r));
  path.setAttribute("fill", b.fill);
  layerEl.appendChild(path);

  const shapeBlob = blobPath(abs.cx, abs.cy, abs.r, BLOB_POINTS, 0.05, b.seed);

  const morphTween = gsap.to(path, {
    attr: { d: shapeBlob },
    duration: b.morphDur,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: i * 0.3,
  });
  tweens.push(morphTween);

  const inst = {
    path,
    abs,
    b,
    shapeBlob,
    morphTween,
    clusterFloatTween: null,
    floatTween: null,
  };

  if (phase === "clustered") {
    const angle = (i / total) * Math.PI * 2;
    const clusterR = minSide * 0.05;
    const clusterX = centerX + Math.cos(angle) * clusterR;
    const clusterY = centerY + Math.sin(angle) * clusterR;

    const offsetX = clusterX - abs.cx;
    const offsetY = clusterY - abs.cy;

    gsap.set(path, { x: offsetX, y: offsetY, opacity: 1 });

    const clusterFloatTween = gsap.to(path, {
      x: offsetX + Math.cos(b.seed) * minSide * 0.025,
      y: offsetY + Math.sin(b.seed) * minSide * 0.025,
      duration: b.floatDur * 0.6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    inst.clusterFloatTween = clusterFloatTween;
    tweens.push(clusterFloatTween);
  } else {
    gsap.set(path, { x: 0, y: 0, opacity: 1 });
    startFinalFloat(inst);
  }

  return inst;
}

function buildBlobs(phase) {
  killTweens();
  clearLayers();
  instancesA = blobsA.map((b, i) =>
    buildBlob(layerARef.value, b, i, blobsA.length, phase),
  );
  instancesB = blobsB.map((b, i) =>
    buildBlob(layerBRef.value, b, i, blobsB.length, phase),
  );
}

// resize 時「更新既有 blob」而不是整批重建 DOM，
// 避免手機瀏覽器工具列收合造成的高度變化觸發大量重建
function updateBlobsInPlace() {
  const updateOne = (inst) => {
    const abs = toAbs(inst.b);
    inst.abs = abs;
    // 更新底層座標，避免 tween 目標值過期；已在跑的 float/morph tween 讓它自然收斂即可
    inst.path.setAttribute("d", circlePath(abs.cx, abs.cy, abs.r));
  };
  instancesA.forEach(updateOne);
  instancesB.forEach(updateOne);
}

// ---------- 散開動畫：中控台呼叫這個 ----------
function disperseInstance(inst, i, onDone) {
  inst.clusterFloatTween?.kill();
  inst.clusterFloatTween = null;

  gsap.to(inst.path, {
    x: 0,
    y: 0,
    duration: 1.3,
    delay: 0,
    ease: "power3.inOut",
    onComplete: () => {
      startFinalFloat(inst);
      onDone();
    },
  });
}

function disperseAll() {
  if (hasDispersed) return;
  hasDispersed = true;
  isDispersing = true;

  const total = instancesA.length + instancesB.length;
  let doneCount = 0;
  const markDone = () => {
    doneCount++;
    if (doneCount >= total) isDispersing = false; // 全部動畫真正播完才解除保護
  };

  instancesA.forEach((inst, i) => disperseInstance(inst, i, markDone));
  instancesB.forEach((inst, i) => disperseInstance(inst, i, markDone));
}

function enterClustered() {
  hasDispersed = false;
  isDispersing = false;
  buildBlobs("clustered");
  registerGooDisperse(disperseAll);
}

// ---------- 滑鼠 / 觸控跟隨（手機直接不掛，省事件與 quickTo 開銷） ----------
function setupFollow() {
  if (isCoarsePointerFlag) return;

  followA = {
    x: gsap.quickTo(layerARef.value, "x", {
      duration: 0.7,
      ease: "power3.out",
    }),
    y: gsap.quickTo(layerARef.value, "y", {
      duration: 0.7,
      ease: "power3.out",
    }),
  };
  followB = {
    x: gsap.quickTo(layerBRef.value, "x", {
      duration: 0.9,
      ease: "power3.out",
    }),
    y: gsap.quickTo(layerBRef.value, "y", {
      duration: 0.9,
      ease: "power3.out",
    }),
  };
}

function handlePointerMove(e) {
  const rect = stageRef.value.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  const nx = (px - 0.5) * 2;
  const ny = (py - 0.5) * 2;
  const minSide = Math.min(size.width, size.height);
  const maxOffset = minSide * 0.12;

  if (followA) {
    followA.x(nx * maxOffset);
    followA.y(ny * maxOffset);
  }
  if (followB) {
    followB.x(-nx * maxOffset);
    followB.y(-ny * maxOffset);
  }
}

function handlePointerLeave() {
  followA?.x(0);
  followA?.y(0);
  followB?.x(0);
  followB?.y(0);
}

// ---------- resize ----------
// 手機瀏覽器網址列收合/展開常常只改變「高度」，寬度不變，
// 這種情況不需要重建 blob，跳過即可，大幅減少不必要的重排
const HEIGHT_ONLY_CHANGE_THRESHOLD = 120; // px，小於這個高度差且寬度沒變，視為工具列造成

let lastWidth = 0;
let lastHeight = 0;

function handleResize(entries) {
  const entry = entries[0];
  if (!entry) return;
  const { width, height } = entry.contentRect;
  if (width < 1 || height < 1) return;

  const widthChanged = Math.abs(width - lastWidth) > 1;
  const heightDelta = Math.abs(height - lastHeight);
  const isLikelyToolbarShift =
    isMobile.value &&
    !widthChanged &&
    heightDelta > 0 &&
    heightDelta < HEIGHT_ONLY_CHANGE_THRESHOLD &&
    lastWidth !== 0;

  size.width = width;
  size.height = height;

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // 散開動畫還在播放中，不要重建，避免瞬間打斷、失去移動過程
    if (isDispersing) return;

    lastWidth = width;
    lastHeight = height;

    if (isLikelyToolbarShift) {
      // 只是工具列高度變化：原地更新座標即可，不必整批砍掉重建 DOM/tween
      updateBlobsInPlace();
      return;
    }

    buildBlobs(hasDispersed ? "dispersed" : "clustered");
  }, RESIZE_DEBOUNCE);
}

// 真正的裝置偵測：一定要在瀏覽器環境、掛載後才跑，
// 避免 SSR（沒有 window）或提早執行時機造成誤判成桌機
function detectDevice() {
  const coarsePointer =
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(pointer: coarse)")?.matches;
  const narrowViewport =
    typeof window !== "undefined" && window.innerWidth <= 768;

  const mobile = coarsePointer || narrowViewport;

  isCoarsePointerFlag = coarsePointer;
  isMobile.value = mobile;

  // ---------------------------------------------------------------------
  // 折衷版數值：手機也開 goo，只是比桌機輕一點，不是完全比照桌機、也不是完全關掉。
  // 每一行後面都用註解留著「完全比照桌機」跟「原本最省效能」兩種數字，
  // 想改回任何一種版本，直接替換對應那行即可。
  // ---------------------------------------------------------------------
  gooStdDeviation.value = mobile ? 20 : 30;
  // 完全比照桌機：mobile ? 30 : 30      原本最省效能（關閉 goo）：mobile ? 0 : 30

  layerBlurStdDeviation.value = mobile ? 22 : 35;
  // 完全比照桌機：mobile ? 35 : 35      原本最省效能：mobile ? 0 : 35

  BLOB_POINTS = mobile ? 12 : 16;
  // 完全比照桌機：16                    原本最省效能：8

  RESIZE_DEBOUNCE = mobile ? 250 : 150;
  blobsA = mobile
    ? blobsAFull.slice(0, MOBILE_MAX_BLOBS_PER_LAYER)
    : blobsAFull;
  blobsB = mobile
    ? blobsBFull.slice(0, MOBILE_MAX_BLOBS_PER_LAYER)
    : blobsBFull;
  // blob 數量由上面的 MOBILE_MAX_BLOBS_PER_LAYER 控制（目前是 3，原本是 2）

  // 除錯用：正式上線前可以先打開，在手機瀏覽器主控台確認判斷是否正確
  // console.log('[GooStage] detectDevice ->', { coarsePointer, narrowViewport, mobile, width: window.innerWidth });
}

onMounted(() => {
  detectDevice();

  // 手機上把 GSAP 全域更新頻率降到 30fps，減少每秒的重算/重繪次數
  if (isMobile.value) {
    gsap.ticker.fps(30);
  }

  const rect = stageRef.value.getBoundingClientRect();
  size.width = rect.width || 700;
  size.height = rect.height || 700;
  lastWidth = size.width;
  lastHeight = size.height;

  enterClustered();
  setupFollow();

  if (!isCoarsePointerFlag) {
    stageRef.value.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    stageRef.value.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });
  }

  resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(stageRef.value);
});

// keepalive 復活時：
// 1. 先斷開又重建 ResizeObserver，避免「凍結→復活」被瀏覽器誤判成一次 resize
// 2. 用當下量到的真實尺寸重新聚集回中心
onActivated(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }

  detectDevice();

  const rect = stageRef.value.getBoundingClientRect();
  size.width = rect.width || size.width;
  size.height = rect.height || size.height;
  lastWidth = size.width;
  lastHeight = size.height;

  enterClustered();

  resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(stageRef.value);
});

// keepalive 情境下離開頁面時觸發（元件不會被銷毀，只是暫停）
// 主動斷開 ResizeObserver，避免它在畫面看不到的時候持續運作、累積誤判的 resize 事件
onDeactivated(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  clearTimeout(resizeTimer);
});

onBeforeUnmount(() => {
  killTweens();
  if (resizeObserver) resizeObserver.disconnect();
  clearTimeout(resizeTimer);
  if (isMobile.value) {
    gsap.ticker.fps(60);
  }
  if (stageRef.value) {
    stageRef.value.removeEventListener("pointermove", handlePointerMove);
    stageRef.value.removeEventListener("pointerleave", handlePointerLeave);
  }
});
</script>

<style scoped>
.goo-stage {
  width: 100%;
  height: 100%;
}
.goo-stage svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}
</style>
