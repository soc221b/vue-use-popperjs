<template>
  <button @click="() => (disabled = !disabled)">
    Disabled: {{ disabled }}
  </button>
  <br />
  <button @click="() => (teleportToBody = !teleportToBody)">
    Teleport to body: {{ teleportToBody }}
  </button>
  <br />
  <button @click="() => (useTransition = !useTransition)">
    Use fade transition: {{ useTransition }}
  </button>

  <div id="root">
    <Popper
      :disabled="disabled"
      :popper-props="{ id: 'popcorn' }"
      :reference-props="{ id: 'tooltip' }"
      :teleport-props="teleportToBody ? { to: 'body' } : undefined"
      :transition-props="useTransition ? { name: 'fade' } : undefined"
      :modifiers="modifiers"
    >
      <template #reference>
        My tooltip
        <div id="arrow" data-popper-arrow></div>
      </template>
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
