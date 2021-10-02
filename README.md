# Vue-use-popperjs

The usePopperjs hook provides an API identical to the ones of
[createPopper](https://popper.js.org/docs/v2/constructors/#createpopper) constructor.

<img alt="Workflow status badge" src="https://github.com/iendeavor/vue-use-popperjs/workflows/CI/badge.svg" />

## Getting Started

### Installation

For vue@3:

```sh
yarn add vue-use-popperjs
```

For vue@2 + @vue/composition-api

```sh
yarn add vue-use-popperjs @vue/composition-api
```

### Usage

```html
<template>
  <div>
    <div ref="popcorn" id="popcorn" aria-describedby="tooltip"></div>
    <div v-show="visible" ref="tooltip" id="tooltip" role="tooltip">
      My tooltip
      <div id="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script>
  // For Vue@3
  import { ref } from "vue";
  // For Vue@2
  import { ref } from "@vue/composition-api";
  import { usePopperjs } from "vue-use-popperjs";

  export default {
    setup() {
      const popcorn = ref();
      const tooltip = ref();
      const { instance, visible } = usePopperjs(popcorn, tooltip, {
        // Popperjs Options
        placement: "top",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
        // Extra Options
        trigger: "hover",
      });

      return {
        popcorn,
        tooltip,
        visible,
      };
    },
  };
</script>
```

## API

### Parameters

#### Reference

`type: MaybeRef<Element | VirtualElement>`

#### Popper

`type: MaybeRef<HTMLElement>`

#### Options

##### Popperjs Options

See [popper.js](https://popper.js.org/docs/v2/constructors)

##### Extra Options

| <div style="width:150px">Option</div> | <div style="width:80px">Default</div> | <div style="width:170px">Type</div>                                                              | <div style="width:400px">Description</div>                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| trigger                               | `'hover'`                             | `'hover'` \|<br> `'focus'` \|<br> `'click-to-toggle'` \|<br> `'click-to-open'` \|<br> `'manual'` | <ul><li>`hover` - open popper when hovering reference</li><li>`focus`: open popper when focusing on reference, hide popper on blur</li><li>`click-to-open`: click reference toggles popper's visibility</li><li>`click-to-open`: open popper when clicking reference, click outside to hide popper</li><li>`manual`: manually change popper's the visible of returned value</li></ul> |
| delay-on-mouseover                    | `200`                                 | `number`                                                                                         | Delay in ms before showing popper during the mouseover event, only applicable for `trigger='hover'`                                                                                                                                                                                                                                                                                   |
| delay-on-mouseout                     | `200`                                 | `number`                                                                                         | Delay in ms before hiding popper during the mouseout event, only applicable for `trigger='hover'`                                                                                                                                                                                                                                                                                     |
| force-show                            | `false`                               | `boolean`                                                                                        | Force show the popper even manually (see the visible of returned value) close it                                                                                                                                                                                                                                                                                                      |

### Return Type

| Key      | Type            | Description                                                                          |
| -------- | --------------- | ------------------------------------------------------------------------------------ |
| instance | `Ref<Instance>` | Popperjs instance                                                                    |
| visible  | `Ref<boolean>`  | Whether popper is visible, Also allow to manually set this value if trigger='manual' |
