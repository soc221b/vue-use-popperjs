<template>
  <component
    :is="referenceIs"
    v-bind="referenceProps"
    ref="reference"
    :aria-describedby="role"
  >
    <slot name="reference" />
  </component>

  <MaybeTeleport :teleport-props="teleportProps">
    <MaybeTransition :transition-props="transitionProps">
      <component
        v-show="visible"
        :is="popperIs"
        v-bind="popperProps"
        ref="popper"
        :role="role"
      >
        <slot />
      </component>
    </MaybeTransition>
  </MaybeTeleport>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  watch,
  PropType,
  TeleportProps,
  TransitionProps,
} from "vue";
import { usePopperjs } from "./hook";
import MaybeTeleport from "./MaybeTeleport.vue";
import MaybeTransition from "./MaybeTransition.vue";

export default defineComponent({
  components: {
    MaybeTeleport,
    MaybeTransition,
  },

  props: {
    // hook options
    delayOnMouseout: Number,
    delayOnMouseover: Number,
    trigger: String as PropType<
      Exclude<
        Required<Parameters<typeof usePopperjs>>["2"]["trigger"],
        "manual"
      >
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
  },

  emits: ["show", "hide"],

  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const reference = ref();
    const popper = ref();
    const { visible } = usePopperjs(reference, popper, {
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
      visible.value ? "popper-" + instance?.uid : undefined
    );

    return {
      instance,
      visible,
      reference,
      popper,
      role,
    };
  },
});
</script>
