<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const svgNS = "http://www.w3.org/2000/svg";
const svgRef = ref(null);
onMounted(() => {
  const svg = svgRef.value;
  if (!svg) return;

  const isMobile = window.innerWidth < 768;
  const SAMPLE_STEM = isMobile ? 120 : 250;
  const SAMPLE_BRANCH = isMobile ? 20 : 150;
  const FLOWERS_PER_BRANCH = isMobile ? 6 : 6;
  const LINE_COUNT = isMobile ? 24 : 36;

  const ORIGIN_SVG = { x: 0, y: 600 };

  const stemD =
    "M721.86,298.03c-16.62,1.19-25.89,15.1-28.63,19.94-.5.89-1.24,1.63-2.14,2.11-2.98,1.58-3.75,5.97-3.88,9.26-.1,2.42-1.78,4.5-4.1,5.18l-52.65,15.41c-1.36.4-2.83.27-4.1-.37l-30.56-15.28c-.37-.18-.75-.33-1.15-.43l-113.56-28.39c-.62-.15-1.26-.2-1.9-.14l-66.45,6.3c-.61.06-1.23.02-1.83-.13l-14.66-3.47c-7.56-1.79-15.52-.65-22.28,3.19l-30.38,17.28c-.55.31-1.15.53-1.78.65l-29.15,5.3c-1.02.19-1.97.65-2.74,1.34l-45.29,40.48c-.66.59-1.18,1.33-1.5,2.16l-7.58,19.59c-.39,1.01-1.05,1.91-1.95,2.53-11.82,8.16-41.53,5.11-51.85,3.75-2.45-.32-4.42-2.21-4.81-4.66-1.3-8.32,2.26-19.58,4.26-25.02.78-2.11.25-4.5-1.41-6.02-14.99-13.71-48.26-15.61-59.22-15.86-2.17-.05-4.17,1.14-5.16,3.08l-19.75,38.91c-1.35,2.66-.39,5.91,2.18,7.41h0c2.34,1.37,3.38,4.21,2.46,6.77l-12.67,35.26c-1.19,3.31.92,6.89,4.39,7.46l25.1,4.1c2.13.35,3.87,1.88,4.49,3.94l5.01,16.71c.29.98.85,1.86,1.61,2.55l14.67,13.34v3.5";
  const topD =
    "M258.07,391.5l32.2,15.53,32.04-50.82s7.73-6.08-51.37-32.04l-47.5-21.54s-30.93-70.7,0-73.46,55.79-1.1,64.62,12.7,14.36,28.72,14.36,28.72c0,0,32.04,6.63,45.84,13.26,0,0,48.05-22.65,77.33-12.15";
  const leftD =
    "M418.29,311.09s18.06-34.59,52.56-33.97l-11.29-18.19s39.52,3.14,59.59-10.04c0,0,29.48,4.39,49.55,0";
  const rightD =
    "M568.7,327.36l6.27-29.33s-.63,7.59,18.19,14.67c0,0,17.56,4.21,47.67,0";

  function sampleSVGPath(d, n) {
    const tmpSvg = document.createElementNS(svgNS, "svg");
    const p = document.createElementNS(svgNS, "path");
    p.setAttribute("d", d);
    tmpSvg.appendChild(p);
    Object.assign(tmpSvg.style, {
      position: "absolute",
      opacity: "0",
      pointerEvents: "none",
    });
    document.body.appendChild(tmpSvg);
    const len = p.getTotalLength();
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const pt = p.getPointAtLength((i / n) * len);
      pts.push({ x: pt.x, y: pt.y });
    }
    tmpSvg.remove();
    return pts;
  }

  const stemPts = sampleSVGPath(stemD, SAMPLE_STEM).reverse();
  const leftPts = sampleSVGPath(leftD, SAMPLE_BRANCH);
  const rightPts = sampleSVGPath(rightD, SAMPLE_BRANCH);
  const topPts = sampleSVGPath(topD, SAMPLE_BRANCH);

  const originRaw = stemPts[0];
  const SCALE = 1;

  function toSVG(pt) {
    return {
      x: ORIGIN_SVG.x + (pt.x - originRaw.x) * SCALE,
      y: ORIGIN_SVG.y + (pt.y - originRaw.y) * SCALE,
    };
  }

  function findClosest(pts, target) {
    let best = 0,
      bestD = Infinity;
    pts.forEach((p, i) => {
      const d = Math.hypot(p.x - target.x, p.y - target.y);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  }

  const leftIdx = findClosest(stemPts, leftPts[0]);
  const rightIdx = findClosest(stemPts, rightPts[0]);
  const topIdx = findClosest(stemPts, topPts[0]);

  function easeOut(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  function growSlice(pts, progress) {
    return pts.slice(0, Math.max(2, Math.floor(pts.length * progress)));
  }

  // 手機直接用動畫結束的 t 值，讓所有 progress 收斂到 1
  const T_END = 3.0;
  let t = isMobile ? T_END : 0,
    mx = 0,
    my = 0,
    wx = 0,
    wy = 0;

  function deform(pts, strength, followStart = 0.4, baseOffset = null) {
    const out = new Array(pts.length);
    const len = pts.length;
    for (let i = 0; i < len; i++) {
      const p = pts[i];
      const n = i / len;
      let x = p.x,
        y = p.y;
      y += Math.pow(n, 3) * strength * 1.2;
      x += Math.sin(n * Math.PI) * strength * 0.8 * 0.3;
      const follow = Math.max(0, (n - followStart) / (1 - followStart || 1));
      if (!isMobile) {
        x += wx * Math.sin(t * 2 + i * 0.2) * 0.08 * n;
      }
      x += wx * follow * 1.5;
      y += wy * follow * 1.2;
      if (baseOffset) {
        x += baseOffset.x * (1 - n);
        y += baseOffset.y * (1 - n);
      }
      out[i] = { x, y };
    }
    return out;
  }

  function taperedPath(pts, startWidth, endWidth) {
    if (pts.length < 2) return "";
    const svgPts = pts.map(toSVG);
    const n = svgPts.length;
    const leftParts = new Array(n);
    const rightParts = new Array(n);

    for (let i = 0; i < n; i++) {
      const p = svgPts[i];
      const frac = i / (n - 1);
      const w = (startWidth + (endWidth - startWidth) * frac) / 2;
      const prev = svgPts[Math.max(0, i - 1)];
      const next = svgPts[Math.min(n - 1, i + 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const l = Math.hypot(dx, dy) || 1;
      const nx = -dy / l;
      const ny = dx / l;
      leftParts[i] =
        `${i === 0 ? "M" : "L"}${(p.x + nx * w).toFixed(1)},${(p.y + ny * w).toFixed(1)}`;
      rightParts[i] =
        `L${(p.x - nx * w).toFixed(1)},${(p.y - ny * w).toFixed(1)}`;
    }

    return `${leftParts.join(" ")} ${rightParts.reverse().join(" ")} Z`;
  }

  const stemG = svg.querySelector("#stem-group");

  const pathCache = {};
  function ensurePath(id, color) {
    if (pathCache[id]) return pathCache[id];
    let el = svg.getElementById(id);
    if (!el) {
      el = document.createElementNS(svgNS, "path");
      el.setAttribute("id", id);
      el.setAttribute("fill", color);
      el.setAttribute("stroke", "none");
      stemG.appendChild(el);
    }
    pathCache[id] = el;
    return el;
  }

  const flowerG = svg.querySelector("#flower-group");

  const FAN_START = 220;
  const FAN_SPAN = 360;
  const lineAngles = Array.from({ length: LINE_COUNT }, (_, i) => {
    const angle = FAN_START + (FAN_SPAN / (LINE_COUNT - 1)) * i;
    const rad = (angle * Math.PI) / 180;
    return { x2: Math.cos(rad) * 20, y2: Math.sin(rad) * 20 };
  });

  const defs = svg.querySelector("defs");
  const sharedGradIds = lineAngles.map(({ x2, y2 }, i) => {
    const id = `sg-${i}`;
    if (!svg.getElementById(id)) {
      const grad = document.createElementNS(svgNS, "linearGradient");
      grad.setAttribute("id", id);
      grad.setAttribute("gradientUnits", "userSpaceOnUse");
      grad.setAttribute("x1", "0");
      grad.setAttribute("y1", "0");
      grad.setAttribute("x2", x2);
      grad.setAttribute("y2", y2);
      const s1 = document.createElementNS(svgNS, "stop");
      s1.setAttribute("offset", "0%");
      s1.setAttribute("stop-color", "#A4AE92");
      const s2 = document.createElementNS(svgNS, "stop");
      s2.setAttribute("offset", "100%");
      s2.setAttribute("stop-color", "#646D4A");
      grad.appendChild(s1);
      grad.appendChild(s2);
      defs.appendChild(grad);
    }
    return id;
  });

  function createFlower(parentG) {
    const g = document.createElementNS(svgNS, "g");
    g.setAttribute("opacity", "0");
    g.setAttribute("transform", "translate(0,0) scale(0)");
    g.setAttribute("pointer-events", "none");
    parentG.appendChild(g);

    const lineEls = lineAngles.map(({ x2, y2 }, i) => {
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", "0");
      line.setAttribute("y1", "0");
      line.setAttribute("x2", "0");
      line.setAttribute("y2", "0");
      line.setAttribute("stroke", `url(#${sharedGradIds[i]})`);
      line.setAttribute("stroke-width", "1");
      line.setAttribute("opacity", "0");
      g.appendChild(line);
      return { line, x2, y2 };
    });

    function bloom() {
      // 手機直接設定終點，跳過 RAF 動畫
      if (isMobile) {
        lineEls.forEach(({ line, x2, y2 }) => {
          line.setAttribute("x2", x2);
          line.setAttribute("y2", y2);
          line.setAttribute("opacity", "1");
        });
        return;
      }

      const myStart = performance.now();

      lineEls.forEach(({ line, x2, y2 }) => {
        line.setAttribute("x2", "0");
        line.setAttribute("y2", "0");
        line.setAttribute("opacity", "0");

        const run = (now) => {
          const elapsed = now - myStart;
          if (elapsed < 0) {
            requestAnimationFrame(run);
            return;
          }
          const ease = easeOut(Math.min(1, elapsed / 600));
          line.setAttribute("x2", (x2 * ease).toFixed(2));
          line.setAttribute("y2", (y2 * ease).toFixed(2));
          line.setAttribute("opacity", ease.toFixed(3));
          if (ease < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
      });
    }

    return { g, bloomT: null, bloom };
  }

  function createFlowerCluster(branchIndex) {
    const group = document.createElementNS(svgNS, "g");
    flowerG.appendChild(group);

    const flowers = Array.from({ length: FLOWERS_PER_BRANCH }, (_, i) => {
      const f = createFlower(group);
      f.pathT = 0.2 + (i / (FLOWERS_PER_BRANCH - 1)) * 0.8;
      f.offsetX = (Math.random() - 0.5) * 20;
      f.offsetY = (Math.random() - 0.5) * 20;
      f.targetScale = 0.6 + Math.random() * 0.8;
      f.phase = branchIndex * 1.3 + i * 0.7;
      // 手機上視為動畫一開始就已 bloom
      f.bloomT = isMobile ? 0 : null;
      if (isMobile) f.bloom();
      return f;
    });

    return { group, flowers };
  }

  const flowerClusters = [0, 1, 2, 3].map(createFlowerCluster);

  function onMouseMove(e) {
    const r = svg.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    my = ((e.clientY - r.top) / r.height - 0.5) * 2;
  }

  function onTouchMove(e) {
    const r = svg.getBoundingClientRect();
    const touch = e.touches[0];
    mx = ((touch.clientX - r.left) / r.width - 0.5) * 2;
    my = ((touch.clientY - r.top) / r.height - 0.5) * 2;
  }
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });

  const maskPathEl = svg.getElementById("mask-path");

  let rafId = null;

  function animate() {
    // 手機：只跑一幀後不再 schedule，t 保持 T_END
    if (!isMobile) {
      rafId = requestAnimationFrame(animate);
      t += 0.006;
    }
    wy += (my - wy) * 0.01;
    wx += (mx - wx) * 0.01;

    const sg = easeOut(Math.min(1, t * 0.8));
    const lg = easeOut(Math.min(1, Math.max(0, (t - 0.6) * 0.6)));
    const rg = easeOut(Math.min(1, Math.max(0, (t - 0.9) * 0.6)));
    const tg = easeOut(Math.min(1, Math.max(0, (t - 0.3) * 0.6)));

    const stemAlive = deform(growSlice(stemPts, sg), 4, 0.4);

    function baseOff(rawIdx) {
      const saI = stemAlive[Math.min(rawIdx, stemAlive.length - 1)];
      return { x: saI.x - stemPts[rawIdx].x, y: saI.y - stemPts[rawIdx].y };
    }

    const leftAlive = deform(growSlice(leftPts, lg), 3, 0, baseOff(leftIdx));
    const rightAlive = deform(growSlice(rightPts, rg), 3, 0, baseOff(rightIdx));
    const topAlive = deform(growSlice(topPts, tg), 3, 0, baseOff(topIdx));

    maskPathEl.setAttribute("d", taperedPath(stemAlive, 20, 1));
    ensurePath("stem-line", "#000000").setAttribute(
      "d",
      taperedPath(stemAlive, 30, 1),
    );
    ensurePath("left-line", "#000000").setAttribute(
      "d",
      lg > 0 ? taperedPath(leftAlive, 10, 1) : "",
    );
    ensurePath("right-line", "#000000").setAttribute(
      "d",
      rg > 0 ? taperedPath(rightAlive, 8, 0.5) : "",
    );
    ensurePath("top-line", "#000000").setAttribute(
      "d",
      tg > 0 ? taperedPath(topAlive, 15, 1) : "",
    );

    const alives = [stemAlive, leftAlive, rightAlive, topAlive];
    const grows = [sg, lg, rg, tg];

    flowerClusters.forEach((cluster, bi) => {
      const alive = alives[bi];
      const grow = grows[bi];

      cluster.flowers.forEach((f) => {
        if (grow < f.pathT) {
          f.g.setAttribute("opacity", "0");
          return;
        }

        if (f.bloomT === null) {
          f.bloomT = t;
          f.bloom();
        }

        const elapsed = t - f.bloomT;
        const bloomScale = easeOut(Math.min(1, elapsed * 1.5));
        const scale = bloomScale * f.targetScale;

        const idx = Math.min(
          Math.floor(f.pathT * alive.length),
          alive.length - 1,
        );
        const svgPt = toSVG(alive[idx]);

        const wobble = Math.sin(t * 0.8 + f.phase) * 18;
        const bob = Math.sin(t * 1.1 + f.phase) * 6;

        f.g.setAttribute(
          "transform",
          `translate(${(svgPt.x + f.offsetX).toFixed(1)},${(svgPt.y + f.offsetY + bob).toFixed(1)}) rotate(${wobble.toFixed(1)}) scale(${scale.toFixed(3)})`,
        );
        f.g.setAttribute("opacity", bloomScale.toFixed(3));
      });
    });
  }

  animate();

  onBeforeUnmount(() => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchmove", onTouchMove);
  });
});
</script>

<template>
  <div class="plant-container">
    <svg
      ref="svgRef"
      width="600"
      height="300"
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      style="overflow: visible"
    >
      <defs>
        <mask id="stem-mask">
          <path id="mask-path" d="" fill="white" />
        </mask>
      </defs>
      <g id="stem-group" />
      <g id="flower-group" />
    </svg>
  </div>
</template>

<style scoped>
.plant-container {
  display: flex;
  justify-content: center;
  align-items: end;
  width: 100%;
  height: 50vh;
}
</style>
