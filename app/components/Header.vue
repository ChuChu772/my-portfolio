<template>
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
      class="col-span-2 sm:col-span-1 md:col-span-3 leading-none text-[var(--color-Aprimary)] text-left z-50"
    >
      <h2>PiPi Chou Portfolio</h2>
    </button>

    <div
      class="flex flex-col items-start col-span-1 lg:col-start-6 max-sm:hidden sm:ml-auto md:mr-auto md:ml-0"
    >
      <LanguageSwitch />
    </div>

    <div
      class="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-2 lg:col-start-7 pr-[2.5px] text-[var(--color-Aprimary)] flex justify-between max-sm:hidden"
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

    <div
      class="mobile-menu grid-layout8 !mb-0 !p-3 !flex-col flex"
      :class="{ open: menuOpen }"
    >
      <div class="col-span-2 pt-12">
        <h2 class="text-[12vw]">PiPi Chou</h2>
        <h4 class="leading-[10px]">
          PiPiChou is a UI/UX Designer and Front-end Developer, based in Taiwan.
          Feel free to get in touch.
        </h4>
        <a
          href="mailto:matsu310720@gmail.com"
          class="cursor-pointer pt-[2px] flex"
        >
          <h4 class="leading-none !m-0">CONTACT : matsu310720@gmail.com</h4>
        </a>
      </div>

      <div class="flex flex-col items-start col-span-3">
        <LanguageSwitch />
      </div>

      <div class="col-span-3 flex flex-col justify-start items-start gap-4">
        <button @click="goTo('/illustration')">
          <h3 class="leading-none !m-0 border-b border-[var(--Aprimary)]">
            ILLUSTRATION
          </h3>
        </button>

        <div class="flex justify-start items-start gap-2 w-full">
          <div class="w-1/3 leading-none">
            <button @click="goTo('/project')">
              <h3 class="leading-none !m-0 border-b border-[var(--Aprimary)]">
                MY WORKS
              </h3>
            </button>
          </div>

          <div
            class="w-2/3 flex flex-col justify-start items-start gap-4 pt-1.5"
          >
            <button @click="goTo('/project/1')">
              <h3 class="leading-none !m-0">
                <span class="mr-2">[ 01 ]</span>{{ t("project1.title") }}
              </h3>
            </button>
            <button @click="goTo('/project/2')">
              <h3 class="leading-none !m-0">
                <span class="mr-2">[ 02 ]</span>{{ t("project2.title") }}
              </h3>
            </button>
            <button @click="goTo('/project/3')">
              <h3 class="leading-none !m-0">
                <span class="mr-2">[ 03 ]</span>{{ t("project3.title") }}
              </h3>
            </button>
            <button @click="goTo('/project/4')">
              <h3 class="leading-none !m-0">
                <span class="mr-2">[ 04 ]</span>{{ t("project4.title") }}
              </h3>
            </button>
            <button @click="goTo('/project/5')">
              <h3 class="leading-none !m-0">
                <span class="mr-2">[ 05 ]</span>{{ t("project5.title") }}
              </h3>
            </button>
          </div>
        </div>
      </div>
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
const { t } = useI18n();

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
  height: 100svh;
  width: 100vw;
  z-index: 45;

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
    margin-bottom: 0 !important;
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
