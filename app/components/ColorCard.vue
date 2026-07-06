<template>
  <div
    class="rounded-xl flex flex-col justify-between p-3 gap-2"
    :style="{ backgroundColor: color.hex }"
  >
    <div class="flex flex-col">
      <p :class="color.textColor">
        {{ color.name }}
      </p>

      <h3 :class="color.textColor" class="pt-1">
        {{ color.hex }}
      </h3>
    </div>

    <p
      class="font-light leading-[13px] hidden md:block"
      :class="color.textColor"
    >
      {{ color.description }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  color: Object,
});
</script>
