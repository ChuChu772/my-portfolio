// plugins/entrance-router.client.ts
import { nextTick } from "vue";
import { START_LOCATION } from "vue-router";
import { useEntranceController } from "@/composables/Useentrancecontroller";

export default defineNuxtPlugin(() => {
  const router = useRouter();
  const { reset } = useEntranceController();

  // 導航「離開別的頁面、進入首頁」之前，先重置中控狀態
  router.beforeEach((to, from) => {
    if (to.path === "/" && from.path !== "/") {
      reset();
    }
  });
});
