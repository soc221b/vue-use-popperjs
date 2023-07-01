import { onMounted, onUnmounted, onUpdated, ref, unref, watch } from "vue";
import type { Ref, VNode } from "vue";
import { createPopper } from "@popperjs/core";
import { warn } from "./utils";
import { process } from "./node";

export type MaybeRef<T> = T | Ref<T>;

export type Trigger =
  | "hover"
  | "focus"
  | "click-to-open"
  | "click-to-toggle"
  | "manual";

export type EventOptions = {
  onShow: Function;
  onHide: Function;
};

function on(
  element: Element,
  event: string,
  handler: EventListenerOrEventListenerObject
) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
}
function off(
  element: Element,
  event: string,
  handler: EventListenerOrEventListenerObject
) {
  if (element && event) {
    element.removeEventListener(event, handler, false);
  }
}

const defaultTrigger: Trigger = "hover";

export function usePopperjs(
  reference: MaybeRef<null | Element | VNode>,
  popper: MaybeRef<null | HTMLElement | VNode>,
  options?: Partial<
    Parameters<typeof createPopper>["2"] &
      EventOptions & {
        trigger: MaybeRef<Trigger | undefined>;
        delayOnMouseover: MaybeRef<number | undefined>;
        delayOnMouseout: MaybeRef<number | undefined>;
        forceShow: MaybeRef<boolean | undefined>;
      }
  >
) {
  const isMounted = ref(false);
  onMounted(() => {
    isMounted.value = true;
  });
  onUnmounted(() => {
    isMounted.value = false;
    destroy();
  });

  const updatedFlag = ref(true);
  onUpdated(() => {
    updatedFlag.value = !updatedFlag.value;
  });

  const referenceRef = ref<null | Element>(null);
  const popperRef = ref<null | HTMLElement>(null);
  watch(
    () => [isMounted.value, updatedFlag.value],
    () => {
      if (!isMounted.value) return;

      const _reference = unref(reference);
      if (_reference instanceof Element) {
        referenceRef.value = _reference;
      } else if (_reference?.el instanceof Element) {
        referenceRef.value = _reference.el;
      } else {
        referenceRef.value = null;
      }

      const _popper = unref(popper);
      if (_popper instanceof HTMLElement) {
        popperRef.value = _popper;
      } else if (_popper?.el instanceof HTMLElement) {
        popperRef.value = _popper.el;
      } else {
        popperRef.value = null;
      }
    }
  );

  const instance = ref<ReturnType<typeof createPopper>>();
  watch(
    () => [referenceRef.value, popperRef.value],
    () => {
      destroy();
      if (!referenceRef.value) return;
      if (!popperRef.value) return;
      concrete();
    }
  );
  const concrete = () => {
    instance.value = createPopper(referenceRef.value!, popperRef.value!, {
      placement: options?.placement ?? "bottom",
      modifiers: options?.modifiers ?? [],
      strategy: options?.strategy ?? "absolute",
      onFirstUpdate: options?.onFirstUpdate ?? undefined,
    });
  };
  const destroy = () => {
    instance.value?.destroy();
    instance.value = undefined;
  };

  const visible = ref(false);
  const doToggle = () => (visible.value = !visible.value);
  const doOpen = () => (visible.value = true);
  const doClose = () => (visible.value = false);
  watch(
    () => [instance.value, unref(options?.trigger), unref(options?.forceShow)],
    () => {
      if (!instance.value) return;

      if (unref(options?.forceShow)) {
        visible.value = true;
        doOff();
        return;
      }

      doOn();
    }
  );

  watch(
    () => unref(options?.forceShow),
    () => {
      if (unref(options?.forceShow)) return;
      if (unref(options?.trigger) === "manual") return;

      visible.value = false;
    }
  );

  const timer = ref<any>();
  const doMouseover = () => {
    if (unref(options?.delayOnMouseover) === 0) {
      doOpen();
    } else {
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        doOpen();
      }, unref(options?.delayOnMouseover) ?? 200);
    }
  };
  const doMouseout = () => {
    if (unref(options?.delayOnMouseout) === 0) {
      doClose();
    } else {
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        doClose();
      }, unref(options?.delayOnMouseout) ?? 200);
    }
  };

  const doOn = () => {
    doOff();

    switch (unref(options?.trigger) ?? defaultTrigger) {
      case "click-to-open": {
        on(referenceRef.value!, "click", doOpen);
        on(document as any, "click", doCloseForDocument);
        break;
      }

      case "click-to-toggle": {
        on(referenceRef.value!, "click", doToggle);
        on(document as any, "click", doCloseForDocument);
        break;
      }

      case "hover": {
        on(referenceRef.value!, "mouseover", doMouseover);
        on(popperRef.value!, "mouseover", doMouseover);
        on(referenceRef.value!, "mouseout", doMouseout);
        on(popperRef.value!, "mouseout", doMouseout);
        break;
      }

      case "focus": {
        on(referenceRef.value!, "focus", doOpen);
        on(popperRef.value!, "focus", doOpen);
        on(referenceRef.value!, "blur", doClose);
        on(popperRef.value!, "blur", doClose);
        break;
      }

      case "manual": {
        break;
      }

      default: {
        throw TypeError();
      }
    }
  };
  const doOff = () => {
    off(referenceRef.value!, "click", doOpen);
    off(document as any, "click", doCloseForDocument);

    off(referenceRef.value!, "click", doToggle);

    off(referenceRef.value!, "mouseover", doMouseover);
    off(popperRef.value!, "mouseover", doMouseover);
    off(referenceRef.value!, "mouseout", doMouseout);
    off(popperRef.value!, "mouseout", doMouseout);

    off(referenceRef.value!, "focus", doOpen);
    off(popperRef.value!, "focus", doOpen);
    off(referenceRef.value!, "blur", doClose);
    off(popperRef.value!, "blur", doClose);
  };
  const doCloseForDocument = (e: Event) => {
    if (referenceRef.value?.contains(e.target as Element)) return;
    if (popperRef.value?.contains(e.target as Element)) return;
    doClose();
  };

  watch(
    () => [instance.value, visible.value],
    () => {
      if (!instance.value) return;

      if (visible.value || unref(options?.forceShow)) {
        popperRef.value?.classList.remove("vue-use-popperjs-none");
        options?.onShow?.();
        instance.value?.update();
      } else {
        popperRef.value?.classList.add("vue-use-popperjs-none");
        options?.onHide?.();
      }
    }
  );

  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    watch(
      () => [
        unref(options?.trigger),
        unref(options?.delayOnMouseover),
        unref(options?.delayOnMouseout),
      ],
      () => {
        if ((unref(options?.trigger) ?? defaultTrigger) === "hover") return;

        if (unref(options?.delayOnMouseover) !== undefined) {
          warn("`delayOnMouseover` only works with `trigger='hover'`");
        }

        if (unref(options?.delayOnMouseout) !== undefined) {
          warn("`delayOnMouseout` only works with `trigger='hover'`");
        }
      },
      { immediate: true, deep: true }
    );
  }

  return {
    instance,
    visible,
  };
}
