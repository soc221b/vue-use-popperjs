import { nextTick, onMounted, onUnmounted, onUpdated, Ref, ref, unref, watchEffect } from 'vue'
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
  const isMounted = ref(false)
  const updatedFlag = ref(true)

  const referenceRef = ref<Element>()
  const popperRef = ref<HTMLElement>()
  watchEffect(() => {
    if (!isMounted.value) return
    if (!updatedFlag.value) return

    nextTick(() => {
      if ((unref(reference) as any)?.$el) {
        referenceRef.value = (unref(reference) as any).$el
      } else {
        referenceRef.value = unref(reference) as Element
      }

      if ((unref(popper) as any)?.$el) {
        popperRef.value = (unref(popper) as any).$el
      } else {
        popperRef.value = unref(popper)
      }

      updatedFlag.value = false
    })
  })

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
    if (referenceRef.value?.contains(e.target as Element)) return
    if (popperRef.value?.contains(e.target as Element)) return
    doClose()
  }

  const doOn = () => {
    doOff()

    switch (options?.trigger ?? 'hover') {
      case 'click-to-open': {
        on(referenceRef.value!, 'click', doOpen)
        on(document as any, 'click', doCloseForDocument)
        break
      }

      case 'click-to-toggle': {
        on(referenceRef.value!, 'click', doToggle)
        on(document as any, 'click', doCloseForDocument)
        break
      }

      case 'hover': {
        on(referenceRef.value!, 'mouseover', doMouseover)
        on(popperRef.value!, 'mouseover', doMouseover)
        on(referenceRef.value!, 'mouseout', doMouseout)
        on(popperRef.value!, 'mouseout', doMouseout)
        break
      }

      case 'focus': {
        on(referenceRef.value!, 'focus', doOpen)
        on(popperRef.value!, 'focus', doOpen)
        on(referenceRef.value!, 'blur', doClose)
        on(popperRef.value!, 'blur', doClose)
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
    off(referenceRef.value!, 'click', doOpen)
    off(document as any, 'click', doCloseForDocument)

    off(referenceRef.value!, 'click', doToggle)

    off(referenceRef.value!, 'mouseover', doMouseover)
    off(popperRef.value!, 'mouseover', doMouseover)
    off(referenceRef.value!, 'mouseout', doMouseout)
    off(popperRef.value!, 'mouseout', doMouseout)

    off(referenceRef.value!, 'focus', doOpen)
    off(popperRef.value!, 'focus', doOpen)
    off(referenceRef.value!, 'blur', doClose)
    off(popperRef.value!, 'blur', doClose)
  }

  watchEffect(() => {
    if (!isMounted.value) return
    if (!instance.value) return
    if (!referenceRef.value) return

    if (options?.forceShow) {
      visible.value = true
      doOff()
      return
    }

    doOn()
  })

  watchEffect(async () => {
    if (!isMounted.value) return
    if (!instance.value) return

    if (visible.value || options?.forceShow) {
      popperRef.value?.classList.remove('vue-use-popperjs-none')
      options?.onShow?.()
      instance.value?.update()
    } else {
      popperRef.value?.classList.add('vue-use-popperjs-none')
      options?.onHide?.()
    }
  })

  onMounted(() => {
    isMounted.value = true
  })

  onUpdated(() => {
    nextTick(() => {
      updatedFlag.value = true
    })
  })

  onUnmounted(() => {
    isMounted.value = false
    instance.value?.destroy()
  })

  watchEffect(() => {
    instance.value?.destroy()
    if (!referenceRef.value) return
    if (!popperRef.value) return
    instance.value = createPopper(referenceRef.value!, popperRef.value!, options as Options)
  })

  return {
    instance,
    visible,
  }
}
