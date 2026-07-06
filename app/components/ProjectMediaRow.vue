<template>
  <div class="grid lg:grid-cols-8 md:grid-cols-6 grid-cols-3 gap-4 items-start">
    <!-- 左側標題 -->
    <div
      class="col-span-3 lg:col-span-1 sm:col-span-4 flex sticky top-12 pt-2 lg:pt-0"
    >
      <h3>{{ title }}</h3>
    </div>

    <!-- 主影片 -->
    <div
      class="col-span-2 md:col-span-4 lg:col-span-5 aspect-[16/9] flex justify-center items-center h-full overflow-hidden"
    >
      <slot name="main" />
    </div>

    <!-- 右側影片 -->
    <div
      class="col-span-1 sm:col-span-2 lg:p-10 p-2 md:p-6 flex justify-center items-center h-full overflow-hidden"
    >
      <slot name="side" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "svg animation",
  },
});
</script>
