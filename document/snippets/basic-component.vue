<template>
  <Popper reference-is="button" popper-is="span">
    <template #reference>Hover me!</template>
    Tooltip
  </Popper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Popper } from "vue-use-popperjs";

export default defineComponent({
  components: {
    Popper,
  },
});
</script>
