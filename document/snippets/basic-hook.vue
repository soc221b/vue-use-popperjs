<template>
  <button ref="button">Hover me!</button>
  <span ref="tooltip">Tooltip</span>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { usePopperjs } from "vue-use-popperjs";

export default defineComponent({
  setup() {
    const button = ref();
    const tooltip = ref();
    usePopperjs(button, tooltip);

    return { button, tooltip };
  },
});
</script>

<style scoped>
.vue-use-popperjs-none {
  display: none;
}
</style>
