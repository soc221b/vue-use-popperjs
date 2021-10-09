<template>
  <template v-if="transitionProps">
    <Transition
      v-bind="transitionProps"
      @before-enter="(...args) => emit('before-enter', ...args)"
      @enter="(...args) => emit('enter', ...args)"
      @after-enter="(...args) => emit('after-enter', ...args)"
      @enter-cancelled="(...args) => emit('enter-cancelled', ...args)"
      @before-leave="(...args) => emit('before-leave', ...args)"
      @leave="(...args) => emit('leave', ...args)"
      @after-leave="(...args) => emit('after-leave', ...args)"
      @leave-cancelled="(...args) => emit('leave-cancelled', ...args)"
    >
      <slot />
    </Transition>
  </template>

  <template v-else>
    <slot />
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, TransitionProps } from "vue";

export default defineComponent({
  props: {
    transitionProps: Object as PropType<TransitionProps>,
  },

  emits: [
    "before-enter",
    "enter",
    "after-enter",
    "enter-cancelled",
    "before-leave",
    "leave",
    "after-leave",
    "leave-cancelled",
  ],

  setup(_, { emit }) {
    return {
      emit,
    };
  },
});
</script>
