import { Instance, Options, createPopper } from "@popperjs/core";
import {
  ComponentPublicInstance,
  ComputedRef,
  Ref,
  computed,
  onBeforeUnmount,
  ref,
  unref,
  watch,
} from "vue";

type MaybeRef<T = any> = T | Ref<T>;

type UsePopperjs = (_: {
  reference: MaybeRef<null | Element | ComponentPublicInstance>;
  popper: MaybeRef<null | HTMLElement | ComponentPublicInstance>;
  options?: MaybeRef<Partial<Options>>;
}) => { instance: ComputedRef<null | Instance> };

export const usePopperjs: UsePopperjs = (param) => {
  const instance = ref<null | Instance>(null);

  watch(
    () => [unref(param.reference), unref(param.popper), unref(param.options)],
    () => {
      destroy();

      const _reference = unref(param.reference);
      const reference: null | Element =
        _reference instanceof Element
          ? _reference
          : _reference?.$el instanceof Element
          ? _reference.$el
          : null;
      const _popper = unref(param.popper);
      const popper: null | HTMLElement =
        _popper instanceof HTMLElement
          ? _popper
          : _popper?.$el instanceof HTMLElement
          ? _popper.$el
          : null;
      const options = unref(param.options);
      if (reference === null) return;
      if (popper === null) return;

      concrete(reference, popper, options);
    },
    { immediate: true }
  );
  onBeforeUnmount(() => destroy());

  function concrete(
    reference: Element,
    popper: HTMLElement,
    options?: Partial<Options>
  ) {
    instance.value = createPopper(reference, popper, options);
  }

  function destroy() {
    instance.value?.destroy();
    instance.value = null;
  }

  return {
    instance: computed(() => instance.value),
  };
};
