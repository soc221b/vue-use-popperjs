<template>
  <div ref="popcorn"></div>
  <div ref="tooltip">My tooltip</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePopperjs } from "vue-use-popperjs";

const popcorn = ref();
const tooltip = ref();
usePopperjs(popcorn, tooltip, {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 8],
      },
    },
  ],
});
</script>

<style scoped>
.vue-use-popperjs-none,
.vue-use-popperjs-none #arrow::before {
  visibility: hidden;
}
</style>
