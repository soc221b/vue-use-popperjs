<template>
  <template v-if="teleportProps">
    <Teleport :to="teleportProps.to" :disabled="teleportProps.disabled">
      <slot />
    </Teleport>
  </template>

  <template v-else>
    <slot />
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, TeleportProps } from "vue-demi";

export default defineComponent({
  props: {
    teleportProps: Object as PropType<TeleportProps>,
  },
});
</script>
