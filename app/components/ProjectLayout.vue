<template>
  <div class="w-screen">
    <div ref="layoutRef" class="grid-layout8 !m-0 !gap-12 md:!gap-4">
      <div
        class="lg:col-span-2 col-span-3 w-3/4 md:w-full sm:w-full md:col-span-3 sm:col-span-2 flex flex-col gap-2"
      >
        <h5>{{ project.title }}</h5>
        <ul>
          <li ref="descRef" class="op">{{ project.description }}</li>
        </ul>
      </div>

      <!-- Roles -->
      <div
        class="lg:col-span-1 lg:col-start-4 sm:col-span-2 lg:col-start-4 md:col-span-1 md:col-start-5 col-span-2 flex flex-col gap-2"
      >
        <h5>Solution</h5>
        <ul class="roles-list">
          <li v-for="r in project.roles" :key="r">{{ r }}</li>
        </ul>
      </div>

      <!-- Link -->
      <div class="col-span-1 flex flex-col gap-2 md:items-end items-start">
        <a
          :href="project.links"
          target="_blank"
          rel="noopener noreferrer"
          class="w-fit border-b"
        >
          <h5>{{ project.link }}</h5>
        </a>
      </div>

      <!-- Sections -->
      <div class="col-span-2 col-start-7 hidden flex-col gap-4 lg:flex">
        <div
          v-for="s in project.sections"
          :key="s.id"
          class="flex gap-4 cursor-pointer"
          @click="scrollTo(s.id)"
        >
          <!-- index -->
          <h5 class="inline-block">{{ s.id }}</h5>

          <!-- content -->
          <div class="flex flex-col gap-2">
            <h5>{{ s.title }}</h5>

            <ul class="section-items">
              <li
                v-for="item in s.items"
                :key="item"
                class="cursor-pointer hover:opacity-60"
                @click.stop="scrollTo(item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import {
  useTextLineAnimation,
  animateTextLines,
} from "@/composables/useTextLineAnimation";

defineProps({ project: Object });

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = 48; // 這裡改成你的 header 高度（例如 top-12 = 48px 或 96px）

  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
};

const layoutRef = ref(null);
const descRef = ref(null);

const { run: runDesc, stop: stopDesc } = useTextLineAnimation(descRef, {
  stagger: 0.2,
  duration: 0.6,
  y: 10,
});

let rolesCleanups = [];
let sectionsCleanups = [];

onMounted(() => {
  if (!layoutRef.value) return;

  const rolesEls = [...layoutRef.value.querySelectorAll(".roles-list li")];
  const sectionItems = [
    ...layoutRef.value.querySelectorAll(".section-items li"),
  ];

  // ✅ 先全部藏起來
  gsap.set(descRef.value, { opacity: 0 });
  gsap.set(rolesEls, { opacity: 0 });
  gsap.set(sectionItems, { opacity: 0 });

  const cols = layoutRef.value.querySelectorAll(":scope > div");
  gsap.from(cols, {
    y: 16,
    opacity: 0,
    duration: 0.7,
    ease: "power4.out",
    stagger: 0.012,
    clearProps: "all",
  });

  setTimeout(() => {
    runDesc();

    rolesEls.forEach((el, i) => {
      const handle = animateTextLines(el, {
        stagger: 0.1,
        duration: 0.5,
        y: 8,
        delay: i * 0.08,
      });
      rolesCleanups.push(handle.restore); // 直接存函式參考，不是整包物件
    });

    sectionItems.forEach((el, i) => {
      const handle = animateTextLines(el, {
        stagger: 0.08,
        duration: 0.5,
        y: 8,
        delay: i * 0.06,
      });
      sectionsCleanups.push(handle.restore);
    });
  }, 100);
});

onBeforeUnmount(() => {
  stopDesc();
  rolesCleanups.forEach((fn) => fn());
  sectionsCleanups.forEach((fn) => fn());
});
</script>
