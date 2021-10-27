<template>
  <label for="disabled">Disabled:</label>
  <input id="disabled" v-model="disabled" type="checkbox" />
  <br />

  <label for="teleportToBody">Teleport to body:</label>
  <input id="teleportToBody" v-model="teleportToBody" type="checkbox" />
  <br />

  <label for="useTransition">Enable fade transition:</label>
  <input id="useTransition" v-model="useTransition" type="checkbox" />
  <br />

  <div id="root">
    <Popper
      :disabled="disabled"
      :reference-props="{ id: 'popcorn' }"
      :popper-props="{ id: 'tooltip' }"
      :teleport-props="teleportToBody ? { to: 'body' } : undefined"
      :transition-props="useTransition ? { name: 'fade' } : undefined"
      :modifiers="modifiers"
    >
      My tooltip
      <div id="arrow" data-popper-arrow></div>
    </Popper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Popper } from "../../src"; // ... from "vue-use-popperjs"

export default defineComponent({
  components: {
    Popper,
  },

  setup() {
    const disabled = ref(false);
    const teleportToBody = ref(true);
    const useTransition = ref(true);
    const modifiers = [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ];

    return {
      disabled,
      teleportToBody,
      useTransition,
      modifiers,
    };
  },
});
</script>
