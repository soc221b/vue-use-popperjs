<template>
  <div ref="popper" class="popper" :aria-describedby="role">
    <slot />
  </div>

  <div v-show="visible" ref="reference" class="reference" :role="role">
    <slot name="reference" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  PropType,
} from "vue-demi";
import { usePopperjs } from "./hook";

export default defineComponent({
  props: {
    modifiers: {
      type: Array as PropType<
        Required<Parameters<typeof usePopperjs>>["2"]["modifiers"]
      >,
    },
  },

  setup(props) {
    const instance = getCurrentInstance();
    const popper = ref();
    const reference = ref();
    const { visible } = usePopperjs(popper, reference, props);

    const role = computed(() =>
      visible.value ? "reference-" + instance?.uid : undefined
    );

    return {
      popper,
      reference,
      visible,
      role,
    };
  },
});
</script>
