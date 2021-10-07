<template>
  <div ref="popcorn" id="popcorn" aria-describedby="tooltip"></div>
  <div ref="tooltip" id="tooltip" role="tooltip">
    My tooltip
    <div id="arrow" data-popper-arrow></div>
  </div>
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
#tooltip.vue-use-popperjs-none,
#tooltip.vue-use-popperjs-none #arrow::before {
  visibility: hidden;
}
</style>
