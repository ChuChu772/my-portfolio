<!-- components/LanguageSwitch.vue -->
<template>
  <div
    class="relative inline-flex self-start bg-[var(--Aprimary)] rounded-full p-1 gap-1 text-xs tracking-widest uppercase"
  >
    <div
      class="absolute top-1 bottom-1 w-[28px] px-4 rounded-full bg-white transition-transform duration-300 ease-out"
      :class="locale === 'en' ? 'translate-x-[36px]' : 'translate-x-0'"
    />

    <button
      @click="switchLanguage('zh')"
      class="relative z-10 w-7 rounded-full flex px-4 items-center justify-center transition-colors duration-300"
    >
      <h4
        class="text-xs font-normal m-0 leading-none"
        :class="
          locale === 'zh' ? 'text-black' : 'text-white/60 hover:text-white'
        "
      >
        CH
      </h4>
    </button>

    <button
      @click="switchLanguage('en')"
      class="relative z-10 w-7 py-[2px] rounded-full flex px-4 items-center justify-center transition-colors duration-300"
    >
      <h4
        class="text-xs font-normal m-0 leading-none"
        :class="
          locale === 'en' ? 'text-black' : 'text-white/60 hover:text-white'
        "
      >
        EN
      </h4>
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();

function switchLanguage(lang: "zh" | "en") {
  setLocale(lang);
}
</script>
