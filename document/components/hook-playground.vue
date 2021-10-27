<template>
  <span>Trigger by:</span>
  <input id="hover" v-model="trigger" type="radio" value="hover" />
  <label for="hover">Hover</label>
  <input id="focus" v-model="trigger" type="radio" value="focus" />
  <label for="focus">Focus</label>
  <input
    id="click-to-open"
    v-model="trigger"
    type="radio"
    value="click-to-open"
  />
  <label for="click-to-open">Click to open</label>
  <input
    id="click-to-toggle"
    v-model="trigger"
    type="radio"
    value="click-to-toggle"
  />
  <label for="click-to-toggle">Click to toggle</label>
  <input id="manual" v-model="trigger" type="radio" value="manual" />
  <label for="manual">Manual</label>
  <template v-if="trigger === 'manual'">
    <br />
    <label for="visible">Show tooltip:</label>
    <input id="visible" v-model="visible" type="checkbox" />
  </template>
  <br />

  <label for="forceShow">Force show tooltip:</label>
  <input id="forceShow" v-model="forceShow" type="checkbox" />
  <br />

  <label for="useDelayOnMouseover">Use delay on mouseover:</label>
  <input
    id="useDelayOnMouseover"
    v-model="useDelayOnMouseover"
    type="checkbox"
  />
  <br />

  <label for="useDelayOnMouseout">Use delay on mouseout:</label>
  <input id="useDelayOnMouseout" v-model="useDelayOnMouseout" type="checkbox" />
  <br />

  <div id="root">
    <div
      :tabindex="trigger === 'focus' ? 0 : undefined"
      ref="popcorn"
      id="popcorn"
      aria-describedby="tooltip"
    ></div>
    <div ref="tooltip" id="tooltip" role="tooltip">
      My tooltip
      <div id="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>
../../src

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { usePopperjs, Trigger } from "../.."; // ... from "vue-use-popperjs"

export default defineComponent({
  setup() {
    const popcorn = ref();
    const tooltip = ref();
    const trigger = ref<Trigger>("hover");
    const forceShow = ref(false);
    const useDelayOnMouseover = ref(true);
    const delayOnMouseover = computed(() =>
      useDelayOnMouseover.value ? 300 : 0
    );
    const useDelayOnMouseout = ref(true);
    const delayOnMouseout = computed(() =>
      useDelayOnMouseout.value ? 300 : 0
    );
    const { visible } = usePopperjs(popcorn, tooltip, {
      trigger,
      forceShow,
      delayOnMouseover,
      delayOnMouseout,
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
      forceShow,
      useDelayOnMouseout,
      useDelayOnMouseover,
    };
  },
});
</script>

<style scoped>
#tooltip.vue-use-popperjs-none,
#tooltip.vue-use-popperjs-none #arrow::before {
  visibility: hidden;
}
</style>
