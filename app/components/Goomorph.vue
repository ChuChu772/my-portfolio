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

const isMobile = ref(false);
let isCoarsePointerFlag = false;

const gooStdDeviation = ref(30);
const layerBlurStdDeviation = ref(35);

const useGooFilter = computed(
  () => !isMobile.value && gooStdDeviation.value > 0,
);

const useLayerBlur = computed(() => layerBlurStdDeviation.value > 0);

const MOBILE_MAX_BLOBS_PER_LAYER = 2;

let BLOB_POINTS = 16;
let RESIZE_DEBOUNCE = 150;

let tweens = [];
let resizeObserver = null;
let resizeTimer = null;
let followA = null;
let followB = null;
let hasDispersed = false;
let isDispersing = false;

let instancesA = [];
let instancesB = [];

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

const blobsAFull = computed(() => [
  {
    xPct: 26,
    yPct: 74,
    rPct: isMobile.value ? 20 : 8,
    fill: "url(#g-c)",
    seed: 4.0,
    morphDur: 2.8,
    floatDur: 6.0,
    dxPct: isMobile.value ? 10 : 70,
    dyPct: isMobile.value ? -10 : -30,
  },
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
]);

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

let blobsA = blobsAFull.value;
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

function updateBlobsInPlace() {
  const updateOne = (inst) => {
    const abs = toAbs(inst.b);
    inst.abs = abs;
    inst.path.setAttribute("d", circlePath(abs.cx, abs.cy, abs.r));
  };
  instancesA.forEach(updateOne);
  instancesB.forEach(updateOne);
}

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
    if (doneCount >= total) isDispersing = false;
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

const HEIGHT_ONLY_CHANGE_THRESHOLD = 120;

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
    if (isDispersing) return;

    lastWidth = width;
    lastHeight = height;

    if (isLikelyToolbarShift) {
      updateBlobsInPlace();
      return;
    }

    buildBlobs(hasDispersed ? "dispersed" : "clustered");
  }, RESIZE_DEBOUNCE);
}

function detectDevice() {
  const coarsePointer =
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(pointer: coarse)")?.matches;
  const narrowViewport =
    typeof window !== "undefined" && window.innerWidth <= 768;

  const mobile = coarsePointer || narrowViewport;

  isCoarsePointerFlag = coarsePointer;
  isMobile.value = mobile;

  gooStdDeviation.value = mobile ? 20 : 30;

  layerBlurStdDeviation.value = mobile ? 22 : 35;

  BLOB_POINTS = mobile ? 12 : 16;

  RESIZE_DEBOUNCE = mobile ? 250 : 150;
  blobsA = mobile
    ? blobsAFull.value.slice(0, MOBILE_MAX_BLOBS_PER_LAYER)
    : blobsAFull.value;
  blobsB = mobile
    ? blobsBFull.slice(0, MOBILE_MAX_BLOBS_PER_LAYER)
    : blobsBFull;
}

onMounted(() => {
  detectDevice();

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
