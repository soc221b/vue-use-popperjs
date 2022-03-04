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
    <MaybeTransition
      :transition-props="transitionProps"
      @before-enter="handle('before-enter')"
      @enter="handle('enter')"
      @after-enter="handle('after-enter')"
      @enter-cancelled="handle('enter-cancelled')"
      @before-leave="handle('before-leave')"
      @leave="handle('leave')"
      @after-leave="handle('after-leave')"
      @leave-cancelled="handle('leave-cancelled')"
    >
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
  ref,
  toRef,
  computed,
  watch,
  UnwrapRef,
  PropType,
  TeleportProps,
  TransitionProps,
} from "vue";
import { usePopperjs } from "./hook";
import MaybeTeleport from "./MaybeTeleport.vue";
import MaybeTransition from "./MaybeTransition.vue";

let popperUid = 0;

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
        UnwrapRef<Required<Parameters<typeof usePopperjs>>["2"]["trigger"]>,
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

  emits: [
    "show",
    "hide",

    // TODO: remove following emits and pass props to transitionProps instead
    "before-enter",
    "enter",
    "after-enter",
    "enter-cancelled",
    "before-leave",
    "leave",
    "after-leave",
    "leave-cancelled",
  ],

  setup(props, { emit }) {
    const reference = ref();
    const popper = ref();
    const { visible } = usePopperjs(reference, popper, {
      ...props,
      trigger: toRef(props, "trigger"),
      forceShow: toRef(props, "forceShow"),
      delayOnMouseover: toRef(props, "delayOnMouseover"),
      delayOnMouseout: toRef(props, "delayOnMouseout"),
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
      process.env.NODE_ENV === "test" && visible.value
        ? "vue-use-popperjs-" + popperUid++
        : undefined
    );

    const handle =
      (event: Parameters<typeof emit>[0]) =>
      (...args: any[]) => {
        return emit(event, ...args);
      };

    return {
      visible,
      reference,
      popper,
      role,
      handle,
    };
  },
});
</script>
