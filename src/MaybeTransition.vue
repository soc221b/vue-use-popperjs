<template>
  <template v-if="transitionProps">
    <Transition
      v-bind="transitionProps"
      @before-enter="handle('before-enter')"
      @enter="handle('enter')"
      @after-enter="handle('after-enter')"
      @enter-cancelled="handle('enter-cancelled')"
      @before-leave="handle('before-leave')"
      @leave="handle('leave')"
      @after-leave="handle('after-leave')"
      @leave-cancelled="handle('leave-cancelled')"
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
    const handle =
      (event: Parameters<typeof emit>[0]) =>
      (...args: any[]) => {
        return emit(event, ...args);
      };

    return {
      handle,
    };
  },
});
</script>
