<template>
  <div id="root">
    <Popper :modifiers="modifiers">
      <div id="popcorn"></div>

      <template #reference>
        <div id="tooltip">
          My tooltip
          <div id="arrow" data-popper-arrow></div>
        </div>
      </template>
    </Popper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Popper } from "../..";

export default defineComponent({
  components: {
    Popper,
  },

  setup() {
    const modifiers = [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ];

    return {
      modifiers,
    };
  },
});
</script>
