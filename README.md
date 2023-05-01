# Vue-use-popperjs

Vue-popper-js is complete popper solution powered by [@popperjs](https://popper.js.org/).

[![npm](https://img.shields.io/npm/dt/vue-use-popperjs)](https://www.npmjs.com/package/vue-use-popperjs)

[![CI](https://github.com/iendeavor/vue-use-popperjs/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/vue-use-popperjs/actions/workflows/ci.yml)

## Features

- Fully customizable popover with **hook function**
- (Vue 3 only) **Popper component**, with built-in support for [**Component**](https://v3.vuejs.org/api/built-in-components.html#component), [**Teleport**](https://v3.vuejs.org/api/built-in-components.html#teleport), and [**Transition**](https://v3.vuejs.org/api/built-in-components.html#transition)

## Documentation

To check out [live examples](https://iendeavor.github.io/vue-use-popperjs/playground.html) and docs, visit [here](https://iendeavor.github.io/vue-use-popperjs)

## Installation

### Hook only

For vue@2 + @vue/composition-api

```shell
$ yarn add vue-use-popperjs@^1 @vue/composition-api
```

For vue@3:

```shell
$ yarn add vue-use-popperjs@^1
```

### Hook + Component

For vue@3:

```shell
$ yarn add vue-use-popperjs
# $ yarn add vue-use-popperjs@^2
```

> vue-use-popperjs@^2 only works with vue@3.

## Basic Usage

### Hook

```html
<template>
  <button ref="button">Hover me!</button>
  <span ref="tooltip">Tooltip</span>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { usePopperjs } from "vue-use-popperjs";

  export default defineComponent({
    setup() {
      const button = ref();
      const tooltip = ref();
      usePopperjs(button, tooltip);

      return { button, tooltip };
    },
  });
</script>

<style scoped>
  .vue-use-popperjs-none {
    display: none;
  }
</style>
```

Vue-use-popperjs automatically add `.vue-use-popperjs-none` class to popper when it is hidden, you can add following css to hide poppers:

```css
.vue-use-popperjs-none {
  display: none;
}
```

### Component

```html
<template>
  <Popper reference-is="button" popper-is="span">
    <template #reference>Hover me!</template>
    Tooltip
  </Popper>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { Popper } from "vue-use-popperjs";

  export default defineComponent({
    components: {
      Popper,
    },
  });
</script>
```

## Advanced Usage

### Component

```html
<template>
  <Popper
    reference-is="span"
    :reference-props="{ id: 'popcorn' }"
    popper-is="span"
    :popper-props="{ id: 'tooltip' }"
    :teleport-props="{ to: 'body' }"
    :transition-props="{ name: 'fade' }"
    :modifiers="modifiers"
  >
    Tooltip
    <div id="arrow" data-popper-arrow></div>
  </Popper>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { Popper } from "vue-use-popperjs";

  export default defineComponent({
    components: {
      Popper,
    },
    setup() {
      const modifiers = [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ];

      return { modifiers };
    },
  });
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  #popcorn {
    display: inline-block;
    width: 134px;
    height: 120px;
    background-image: url("https://popper.js.org/images/popcorn-box.svg");
  }

  #tooltip {
    display: inline-block;
    background: #643045;
    color: #ffffff;
    font-weight: bold;
    padding: 5px 10px;
    font-size: 13px;
    border-radius: 4px;
  }

  #arrow,
  #arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  #arrow {
    visibility: hidden;
  }

  #arrow::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
  }

  [data-popper-placement^="top"] #arrow {
    bottom: -4px;
  }

  [data-popper-placement^="bottom"] #arrow {
    top: -4px;
  }

  [data-popper-placement^="left"] #arrow {
    right: -4px;
  }

  [data-popper-placement^="right"] #arrow {
    left: -4px;
  }
</style>
```

## About

<a href="https://www.buymeacoffee.com/iendeavor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

Distributed under the MIT license. See LICENSE for more information.

https://github.com/iendeavor
