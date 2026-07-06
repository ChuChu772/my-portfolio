<template>
  <!-- 白色過場 -->
  <div
    class="fixed inset-0 z-40 bg-white transition-opacity duration-700 pointer-events-none"
    :class="isLeaving ? 'opacity-100' : 'opacity-0'"
  />

  <!-- Header -->
  <div
    class="grid-layout8 fixed bg-white top-0 w-full z-50 !m-0 !pr-4 !pl-[15.5px] items-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
    :class="headerLeaving ? '-translate-y-full' : 'translate-y-0'"
  >
    <button
      @click="goTo('/')"
      class="col-span-2 sm:col-span-1 md:col-span-4 leading-none text-[var(--color-Aprimary)] text-left z-50"
    >
      <h2>PiPi Chou Portfolio</h2>
    </button>
    <div
      class="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 lg:col-start-7 pr-[2.5px] text-[var(--color-Aprimary)] flex justify-between max-sm:hidden"
    >
      <a href="mailto:matsu310720@gmail.com" class="cursor-pointer">
        <h3 class="leading-none !m-0">CONTACT</h3>
      </a>

      <button @click="goTo('/project')">
        <h3 class="leading-none !m-0">MY WORKS</h3>
      </button>

      <button @click="goTo('/illustration')">
        <h3 class="leading-none !m-0">ILLUSTRATION</h3>
      </button>
    </div>

    <button
      class="mobile-menu-btn h-3 w-6 hidden flex-col justify-between z-50 col-span-1 sm:hidden md:hidden lg:hidden"
      @click="menuOpen = !menuOpen"
    >
      <span
        class="block h-[2px] bg-black transition-all duration-300 origin-center"
        :class="menuOpen ? 'rotate-[225deg] translate-y-[calc(50%+4px)]' : ''"
      ></span>
      <span
        class="block h-[2px] bg-black transition-all duration-300 origin-center"
        :class="menuOpen ? '-rotate-[225deg] -translate-y-[calc(50%+4px)]' : ''"
      ></span>
    </button>

    <div class="mobile-menu" :class="{ open: menuOpen }">
      <a href="mailto:matsu310720@gmail.com" class="cursor-pointer">
        <h3 class="leading-none !m-0">CONTACT</h3>
      </a>

      <button @click="goTo('/project')">
        <h3 class="leading-none !m-0">MY WORKS</h3>
      </button>

      <button @click="goTo('/illustration')">
        <h3 class="leading-none !m-0">ILLUSTRATION</h3>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useEntranceController } from "@/composables/Useentrancecontroller";
const route = useRoute();

const { reset, triggerEntrance } = useEntranceController();

const isLeaving = ref(false);
const headerLeaving = ref(false);
const menuOpen = ref(false);

const goTo = async (path) => {
  menuOpen.value = false;
  if (route.path === path) return;
  if (isLeaving.value) return;

  isLeaving.value = true;

  if (path === "/") {
    headerLeaving.value = true;
    await new Promise((resolve) => setTimeout(resolve, 700));
  }

  await new Promise((resolve) => setTimeout(resolve, 700));
  await navigateTo(path);

  isLeaving.value = false;
};
</script>

<style scoped>
button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
}
.desktop-menu {
  display: flex;
}

/* 選單面板 */

.mobile-menu {
  position: fixed;
  inset: 0;
  pointer-events: none;

  background: white;
  height: 100vh;
  width: 100vw;
  z-index: 45;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 32px;

  transform: scale(1.2);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.mobile-menu.open {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
@media (max-width: 640px) {
  .grid-layout8 {
    width: 100vw;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    padding: 16px;
    /* margin: 256px 0; */
  }
}
@media (max-width: 640px) {
  .mobile-menu-btn {
    display: flex;
    grid-column: 3; /* 放在第三欄（最右邊）*/
    justify-self: end; /* 靠右對齊 */
    align-self: center; /* 垂直置中 */
  }
}
</style>
