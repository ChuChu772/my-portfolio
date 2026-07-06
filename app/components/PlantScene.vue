<script setup>
import * as THREE from "three";

const container = ref(null);

onMounted(() => {
  if (!container.value) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.aspect = 900 / 900;
  camera.updateProjectionMatrix();

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  renderer.setSize(900, 900);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.value.appendChild(renderer.domElement);

  // =========================
  // 🌿 POT
  // =========================
  const POT_HEIGHT = 1.4;
  const POT_Y = -1.2;
  const POT_TOP_Y = POT_Y + POT_HEIGHT / 2;

  const potGroup = new THREE.Group();
  potGroup.position.y = POT_Y;
  scene.add(potGroup);

  const potMaterial = new THREE.MeshBasicMaterial({ color: "#6b4f3a" });
  const potInsideMaterial = new THREE.MeshBasicMaterial({ color: "#4a3628" });

  const potMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.5, POT_HEIGHT, 32),
    potMaterial,
  );
  const innerMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(1.1, 1.4, 1.2, 32),
    potInsideMaterial,
  );
  potGroup.add(potMesh, innerMesh);

  // =========================
  // 🌱 PLANT
  // =========================
  const plant = new THREE.Group();
  plant.position.set(0, POT_TOP_Y, 0);

  const root = new THREE.Group();
  scene.add(root);
  root.add(plant);

  // =========================
  // 🎨 STEM SHADER MATERIAL（手繪感）
  // =========================
  const stemMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#AA9F97") },
      uColorDark: { value: new THREE.Color("#68574C") },
    },
    vertexShader: `
      varying vec3 vNormal;
varying vec2 vUv;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
    `,
    fragmentShader: `
uniform vec3 uColor;
uniform vec3 uColorDark;

varying vec3 vNormal;

void main() {

  // 🌿 假光方向（可以之後動畫）
  vec3 lightDir = normalize(vec3(0.3, 0.8, 0.6));

  float NdotL = dot(vNormal, lightDir);

  // 柔化陰影（避免硬塊）
  float light = smoothstep(-0.2, 0.8, NdotL);

  // 🌿 顏色漸層（沿高度做，不靠 UV.x）
  float height = gl_FragCoord.y * 0.001; // fallback（或改 attribute）

  vec3 col = mix(uColorDark, uColor, light);

  gl_FragColor = vec4(col, 1.0);
}
`,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const flowerMat = new THREE.MeshBasicMaterial({
    color: "#232D24",
    depthTest: false,
  });

  let mouseX = 0;
  let mouseY = 0;
  let windX = 0;
  let windY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function samplePath(d, segments = 200) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    svg.appendChild(path);
    const len = path.getTotalLength();
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const p = path.getPointAtLength((i / segments) * len);
      const SCALE = 0.03;
      pts.push(new THREE.Vector3(p.x * SCALE, -p.y * SCALE, 0));
    }
    return pts;
  }

  function buildTube(points, r = 0.06) {
    if (!points || points.length < 2) return new THREE.BufferGeometry();
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      120,
      r,
      8,
      false,
    );
  }

  const stemPath =
    "M104.44,439.72s-23.95-67.43,7.8-105.5c22.53-27.02,51.83-27.52,79.36-14.22,15.78,7.63,36.84,12.99,51.94,16.18,21.82,4.61,44.68,1.42,64.06-9.62,7.4-4.21,14.74-9.78,21.16-17.12,18.51-21.15,38.45-31.59,48.14-35.77,7.75-3.34,14.41-8.89,18.76-16.12,2.36-3.92,4.22-8.54,4.65-13.7";
  const leftPath =
    "M127.4,321.13s-13.6-4.14-28.82.67c-15.23,4.81-39.83,4.14-50.9-14.48-2.44-4.1-4.4-8.27-5.85-12.51,0,0-19.8-1.58-25.62-24.75";
  const rightPath = "M331.71,306.16s24.22-12.94,60.31,0";
  const topPath = "M290.42,334.04s13.3-11.84,16.12-23.37,8.7-22.81,11.05-27.28";

  const stemRaw = samplePath(stemPath, 300);
  const leftRaw = samplePath(leftPath, 120);
  const rightRaw = samplePath(rightPath, 80);
  const topRaw = samplePath(topPath, 80);

  const origin = stemRaw[0].clone();
  function offsetPoints(points) {
    return points.map((p) => p.clone().sub(origin));
  }

  const stemPoints = offsetPoints(stemRaw);
  const leftPoints = offsetPoints(leftRaw);
  const rightPoints = offsetPoints(rightRaw);
  const topPoints = offsetPoints(topRaw);

  // 🔑 枝幹各自用獨立的 shader material clone，讓 uTime 各自獨立
  const stemMat = stemMaterial.clone();
  const leftMat = stemMaterial.clone();
  const rightMat = stemMaterial.clone();
  const topMat = stemMaterial.clone();

  let stemMesh = new THREE.Mesh(buildTube([], 1), stemMat);
  let leftMesh = new THREE.Mesh(buildTube([], 0.05), leftMat);
  let rightMesh = new THREE.Mesh(buildTube([], 0.05), rightMat);
  let topMesh = new THREE.Mesh(buildTube([], 0.05), topMat);
  plant.add(stemMesh, leftMesh, rightMesh, topMesh);

  // =========================
  // 🌸 FLOWERS
  // =========================
  function createFlower() {
    const g = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const p = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.45, 0.01),
        flowerMat,
      );
      p.renderOrder = 3;
      p.position.y = 0;
      p.rotation.z = (Math.PI * 2 * i) / 8;
      g.add(p);
    }

    function createBlobGeometry(radius, segments = 24, irregularity = 0.15) {
      const positions = [];
      const indices = [];
      positions.push(0, 0, 0);
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const r = radius * (1 + (Math.random() - 0.5) * irregularity);
        positions.push(Math.cos(angle) * r, Math.sin(angle) * r, 0);
      }
      for (let i = 1; i <= segments; i++) {
        indices.push(0, i, i === segments ? 1 : i + 1);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      geo.setIndex(indices);
      return geo;
    }

    const glowLayers = [
      { radius: 0.09, opacity: 1.0 },
      { radius: 0.14, opacity: 0.5 },
      { radius: 0.2, opacity: 0.25 },
      { radius: 0.28, opacity: 0.1 },
    ];

    glowLayers.forEach(({ radius, opacity }, layerIndex) => {
      const mat = new THREE.MeshBasicMaterial({
        color: "#4A604C",
        transparent: true,
        opacity,
        depthTest: false,
      });
      const c = new THREE.Mesh(createBlobGeometry(radius, 24, 0.2), mat);
      c.renderOrder = 2 + layerIndex;
      g.add(c);
    });

    g.scale.set(0, 0, 0);
    plant.add(g);
    return g;
  }

  const flowerDefs = [
    { flower: createFlower(), growDelay: 0, bloomT: null },
    { flower: createFlower(), growDelay: 0, bloomT: null },
    { flower: createFlower(), growDelay: 0, bloomT: null },
    { flower: createFlower(), growDelay: 0, bloomT: null },
  ];

  function findClosestIndex(points, target) {
    let minDist = Infinity;
    let idx = 0;
    points.forEach((p, i) => {
      const d = p.distanceTo(target);
      if (d < minDist) {
        minDist = d;
        idx = i;
      }
    });
    return idx;
  }

  const leftStemIdx = findClosestIndex(stemPoints, leftPoints[0]);
  const rightStemIdx = findClosestIndex(stemPoints, rightPoints[0]);
  const topStemIdx = findClosestIndex(stemPoints, topPoints[0]);

  let t = 0;
  let initialized = false;

  function growSlice(points, progress) {
    const count = Math.max(2, Math.floor(points.length * progress));
    return points.slice(0, count);
  }

  function deform(points, strength, followStart = 0.4, baseOffset = null) {
    return points.map((p, i) => {
      const np = p.clone();
      const n = i / points.length;

      const gravity = Math.pow(n, 3);
      np.y -= gravity * strength * 1.2;

      const curve = Math.sin(n * Math.PI) * strength * 0.8;
      np.x += curve * 0.3;

      const follow = Math.max(0, (n - followStart) / (1 - followStart || 1));
      const swayX = Math.sin(t * 2 + i * 0.2) * 0.02 * n;
      np.x += windX * swayX;
      np.x += windX * follow * 0.3;
      np.y += windY * follow * 0.25;

      if (baseOffset) {
        np.x += baseOffset.x * (1 - n);
        np.y += baseOffset.y * (1 - n);
      }

      return np;
    });
  }

  function animate() {
    requestAnimationFrame(animate);

    t += 0.01;
    windX += (mouseX - windX) * 0.01;
    windY += (mouseY - windY) * 0.01;

    // 🔑 更新 shader time
    stemMat.uniforms.uTime.value = t;
    leftMat.uniforms.uTime.value = t;
    rightMat.uniforms.uTime.value = t;
    topMat.uniforms.uTime.value = t;

    function easeOutCubic(x) {
      return 1 - Math.pow(1 - x, 3);
    }

    const stemGrow = easeOutCubic(Math.min(1, t * 0.8));
    const leftGrow = easeOutCubic(Math.min(1, Math.max(0, (t - 0.2) * 0.6)));
    const rightGrow = easeOutCubic(Math.min(1, Math.max(0, (t - 0.6) * 0.6)));
    const topGrow = easeOutCubic(Math.min(1, Math.max(0, (t - 0.4) * 0.6)));

    const stemAlive = deform(growSlice(stemPoints, stemGrow), 0.15, 0.4);

    const leftOffset = stemAlive[Math.min(leftStemIdx, stemAlive.length - 1)]
      .clone()
      .sub(stemPoints[leftStemIdx]);
    const rightOffset = stemAlive[Math.min(rightStemIdx, stemAlive.length - 1)]
      .clone()
      .sub(stemPoints[rightStemIdx]);
    const topOffset = stemAlive[Math.min(topStemIdx, stemAlive.length - 1)]
      .clone()
      .sub(stemPoints[topStemIdx]);

    const leftAlive = deform(
      growSlice(leftPoints, leftGrow),
      0.2,
      0,
      leftOffset,
    );
    const rightAlive = deform(
      growSlice(rightPoints, rightGrow),
      0.2,
      0,
      rightOffset,
    );
    const topAlive = deform(growSlice(topPoints, topGrow), 0.2, 0, topOffset);

    stemMesh.geometry.dispose();
    stemMesh.geometry = buildTube(stemAlive, 0.08);

    leftMesh.geometry.dispose();
    leftMesh.geometry =
      leftGrow > 0 ? buildTube(leftAlive, 0.05) : new THREE.BufferGeometry();

    rightMesh.geometry.dispose();
    rightMesh.geometry =
      rightGrow > 0 ? buildTube(rightAlive, 0.05) : new THREE.BufferGeometry();

    topMesh.geometry.dispose();
    topMesh.geometry =
      topGrow > 0 ? buildTube(topAlive, 0.05) : new THREE.BufferGeometry();

    // =========================
    // 🌸 花朵
    // =========================
    const growValues = [stemGrow, leftGrow, rightGrow, topGrow];
    const aliveArrays = [stemAlive, leftAlive, rightAlive, topAlive];

    flowerDefs.forEach((def, i) => {
      const alive = aliveArrays[i];
      const grow = growValues[i];

      if (alive.length > 1) {
        def.flower.position.copy(alive[alive.length - 1]);
      }

      if (grow >= 0.6 && def.bloomT === null) {
        def.bloomT = t;
      }

      if (def.bloomT !== null) {
        const elapsed = t - def.bloomT;
        const linear = Math.max(
          0,
          Math.min(2.2, (elapsed - def.growDelay) * 7),
        );
        const s = 1 - Math.pow(1 - linear, 3);
        def.flower.scale.set(s, s, s);

        const phase = i * 1.3;
        def.flower.rotation.z = Math.sin(t * 0.8 + phase) * 0.15;
        def.flower.position.y += Math.sin(t * 1.2 + phase) * 0.1;
      }
    });

    // =========================
    // 📷 CAMERA
    // =========================
    if (!initialized) {
      camera.position.set(0, 0, 20);
      camera.lookAt(2, 0, 0);
      initialized = true;
    }

    renderer.render(scene, camera);
  }

  animate();

  onBeforeUnmount(() => {
    renderer.dispose();
  });
});
</script>

<template>
  <div ref="container" class="w-[900px] h-[700px] mx-auto border" />
</template>
