import { ref } from "vue";

type PlayFn = () => void;

const appReady = ref(false);
const hasSplashPlayed = ref(false); // 不會被 reset() 清掉，用來分辨「首次載入」vs「之後返回」
const gooDisperse = ref<PlayFn | null>(null);
const contentEntrance = ref<PlayFn | null>(null);

export function useEntranceController() {
  function registerGooDisperse(fn: PlayFn) {
    console.log("[entrance] registerGooDisperse called");
    gooDisperse.value = fn;
    tryAutoTrigger();
  }

  function registerContentEntrance(fn: PlayFn) {
    console.log("[entrance] registerContentEntrance called");
    contentEntrance.value = fn;
    tryAutoTrigger();
  }

  // 兩個函式都註冊好了，且已經播過一次 splash（代表這是「回到首頁」），就自動觸發
  function tryAutoTrigger() {
    console.log("[entrance] tryAutoTrigger check:", {
      hasSplashPlayed: hasSplashPlayed.value,
      appReady: appReady.value,
      hasGoo: !!gooDisperse.value,
      hasContent: !!contentEntrance.value,
    });
    if (
      hasSplashPlayed.value &&
      !appReady.value &&
      gooDisperse.value &&
      contentEntrance.value
    ) {
      triggerEntrance();
    }
  }

  // app.vue 在 splash 結束時呼叫這個（第一次）
  function triggerEntrance() {
    if (appReady.value) return;
    appReady.value = true;
    hasSplashPlayed.value = true;
    gooDisperse.value?.();
    contentEntrance.value?.();
  }

  // Header 在離開/返回 index 前呼叫，讓 index 下次掛載可以重新註冊+自動播放
  function reset() {
    console.log("[entrance] reset() called");
    appReady.value = false;
    gooDisperse.value = null;
    contentEntrance.value = null;
  }

  return {
    appReady,
    registerGooDisperse,
    registerContentEntrance,
    triggerEntrance,
    reset,
  };
}
