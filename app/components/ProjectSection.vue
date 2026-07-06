<template>
  <div class="flex gap-4 cursor-pointer" @click="go">
    <!-- index -->
    <h5 class="inline-block">
      {{ section.id }}
    </h5>

    <!-- content -->
    <div class="flex flex-col gap-2">
      <h5>
        {{ section.title }}
      </h5>

      <ul>
        <li v-for="item in section.items" :key="item" :id="section.id">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  section: Object,
});

const emit = defineEmits(["navigate"]);

const go = () => {
  emit("navigate", props.section.id);
};
</script>
