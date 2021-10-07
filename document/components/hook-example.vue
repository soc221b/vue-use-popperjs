<template>
  <span>Trigger by:</span>
  <input id="hover" v-model="trigger" type="radio" value="hover" />
  <label for="hover">Hover</label>
  <input
    id="click-to-toggle"
    v-model="trigger"
    type="radio"
    value="click-to-toggle"
  />
  <label for="click-to-toggle">Click to toggle</label>
  <br />

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
import { usePopperjs, Trigger } from "../.."; // ... from "vue-use-popperjs"

export default defineComponent({
  setup() {
    const popcorn = ref();
    const tooltip = ref();
    const trigger = ref<Trigger>("hover");
    const { visible } = usePopperjs(popcorn, tooltip, {
      trigger,
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
      trigger,
      visible,
    };
  },
});
</script>
