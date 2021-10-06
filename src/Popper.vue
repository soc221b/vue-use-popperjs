<template>
  <component
    :is="popperIs"
    v-bind="popperProps"
    ref="popper"
    class="popper"
    :aria-describedby="role"
  >
    <slot />
  </component>

  <MaybeTeleportVue :teleport-props="teleportProps">
    <MaybeTransition :transition-props="transitionProps">
      <component
        :is="referenceIs"
        v-bind="referenceProps"
        v-show="visible"
        ref="reference"
        class="reference"
        :role="role"
      >
        <slot name="reference" />
      </component>
    </MaybeTransition>
  </MaybeTeleportVue>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  ref,
  computed,
  watch,
  PropType,
  TeleportProps,
  TransitionProps,
} from "vue-demi";
import { usePopperjs } from "./hook";
import MaybeTeleportVue from "./MaybeTeleport.vue";
import MaybeTransition from "./MaybeTransition.vue";

const props = defineProps({
  // hook options
  delayOnMouseout: Number,
  delayOnMouseover: Number,
  trigger: String as PropType<
    Exclude<Required<Parameters<typeof usePopperjs>>["2"]["trigger"], "manual">
  >,
  forceShow: Boolean,
  modifiers: Array as PropType<
    Required<Parameters<typeof usePopperjs>>["2"]["modifiers"]
  >,
  onFirstUpdate: Function as PropType<
    Required<Parameters<typeof usePopperjs>>["2"]["onFirstUpdate"]
  >,
  placement: String as PropType<
    Required<Parameters<typeof usePopperjs>>["2"]["placement"]
  >,
  strategy: String as PropType<
    Required<Parameters<typeof usePopperjs>>["2"]["strategy"]
  >,

  // component props
  popperIs: {
    default: "div",
    type: String,
  },
  popperProps: {
    type: Object,
  },
  referenceIs: {
    default: "div",
    type: String,
  },
  referenceProps: {
    type: Object,
  },
  disabled: Boolean,
  teleportProps: Object as PropType<TeleportProps>,
  transitionProps: Object as PropType<TransitionProps>,
});

const emit = defineEmits(["show", "hide"]);

const instance = getCurrentInstance();
const popper = ref();
const reference = ref();
const { visible } = usePopperjs(popper, reference, {
  ...props,
  onShow: () => emit("show"),
  onHide: () => emit("hide"),
});

watch(
  () => [visible.value, props.disabled],
  () => {
    if (props.disabled && visible.value) {
      visible.value = false;
    }
  },
  { flush: "sync" }
);

const role = computed(() =>
  visible.value ? "reference-" + instance?.uid : undefined
);
</script>
