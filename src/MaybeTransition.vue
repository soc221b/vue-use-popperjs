<template>
  <template v-if="transitionProps">
    <Transition v-bind="transitionProps">
      <slot />
    </Transition>
  </template>

  <template v-else>
    <slot />
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, TransitionProps } from "vue-demi";

export default defineComponent({
  props: {
    transitionProps: Object as PropType<TransitionProps>,
  },
});
</script>
