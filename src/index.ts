import { onMounted, onUnmounted, Ref, ref, unref, watchEffect } from 'vue'
import { createPopper, Options, VirtualElement } from '@popperjs/core'

type MaybeRef<T> = T | Ref<T>

type Trigger = 'hover' | 'focus' | 'click-to-open' | 'click-to-toggle' | 'manual'

type EventOptions = {
  onShow: Function
  onHide: Function
}

function on(element: Element, event: string, handler: EventListenerOrEventListenerObject) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}
function off(element: Element, event: string, handler: EventListenerOrEventListenerObject) {
  if (element && event) {
    element.removeEventListener(event, handler, false)
  }
}

export function usePopperjs(
  reference: MaybeRef<Element | VirtualElement>,
  popper: MaybeRef<HTMLElement>,
  options?: Partial<
    Options &
      EventOptions & {
        trigger: Trigger
        delayOnMouseover: number
        delayOnMouseout: number
        forceShow: boolean
      }
  >,
) {
  const instance = ref<ReturnType<typeof createPopper>>()

  const visible = ref(false)
  const doToggle = () => (visible.value = !visible.value)
  const doOpen = () => (visible.value = true)
  const doClose = () => (visible.value = false)

  const timer = ref<any>()
  const doMouseover = () => {
    if (options?.delayOnMouseover === 0) {
      doOpen()
    } else {
      clearTimeout(timer.value)
      timer.value = setTimeout(() => {
        doOpen()
      }, options?.delayOnMouseover ?? 200)
    }
  }
  const doMouseout = () => {
    if (options?.delayOnMouseout === 0) {
      doClose()
    } else {
      clearTimeout(timer.value)
      timer.value = setTimeout(() => {
        doClose()
      }, options?.delayOnMouseout ?? 200)
    }
  }

  const doCloseForDocument = (e: Event) => {
    if ((unref(reference) as Element).contains(e.target as Element)) return
    if ((unref(popper) as Element).contains(e.target as Element)) return
    doClose()
  }

  const doOn = () => {
    doOff()

    switch (options?.trigger ?? 'hover') {
      case 'click-to-open': {
        on(unref(reference) as Element, 'click', doOpen)
        on(document as any, 'click', doCloseForDocument)
        break
      }

      case 'click-to-toggle': {
        on(unref(reference) as Element, 'click', doToggle)
        on(document as any, 'click', doCloseForDocument)
        break
      }

      case 'hover': {
        on(unref(reference) as Element, 'mouseover', doMouseover)
        on(unref(popper) as Element, 'mouseover', doMouseover)
        on(unref(reference) as Element, 'mouseout', doMouseout)
        on(unref(popper) as Element, 'mouseout', doMouseout)
        break
      }

      case 'focus': {
        on(unref(reference) as Element, 'focus', doOpen)
        on(unref(popper), 'focus', doOpen)
        on(unref(reference) as Element, 'blur', doClose)
        on(unref(popper), 'blur', doClose)
        break
      }

      case 'manual': {
        break
      }

      default: {
        throw TypeError()
      }
    }
  }

  const doOff = () => {
    off(unref(reference) as Element, 'click', doOpen)
    off(document as any, 'click', doCloseForDocument)

    off(unref(reference) as Element, 'click', doToggle)

    off(unref(reference) as Element, 'mouseover', doMouseover)
    off(unref(popper) as Element, 'mouseover', doMouseover)
    off(unref(reference) as Element, 'mouseout', doMouseout)
    off(unref(popper) as Element, 'mouseout', doMouseout)

    off(unref(reference) as Element, 'focus', doOpen)
    off(unref(popper), 'focus', doOpen)
    off(unref(reference) as Element, 'blur', doClose)
    off(unref(popper), 'blur', doClose)
  }

  watchEffect(() => {
    if (!instance.value) return

    if (options?.forceShow) {
      visible.value = true
      doOff()
      return
    }

    doOn()
  })

  watchEffect(async () => {
    if (!instance.value) return

    if (visible.value || options?.forceShow) {
      unref(popper).classList.remove('vue-use-popperjs-none')
      options?.onShow?.()
      instance.value?.update()
    } else {
      unref(popper).classList.add('vue-use-popperjs-none')
      options?.onHide?.()
    }
  })

  onMounted(() => {
    instance.value = createPopper(unref(reference), unref(popper), options as Options)
  })

  onUnmounted(() => {
    instance.value?.destroy()
  })

  return {
    instance,
    visible,
  }
}
