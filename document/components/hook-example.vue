<template>
  <div id="root">
    <div ref="popcorn" id="popcorn" aria-describedby="tooltip"></div>
    <div v-show="visible" ref="tooltip" id="tooltip" role="tooltip">
      My tooltip
      <div id="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { usePopperjs } from "../..";

export default defineComponent({
  setup() {
    const popcorn = ref();
    const tooltip = ref();
    const { visible } = usePopperjs(popcorn, tooltip, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    });

    return {
      popcorn,
      tooltip,
      visible,
    };
  },
});
</script>
