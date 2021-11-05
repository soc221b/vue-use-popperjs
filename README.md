# Vue-use-popperjs

Vue-popper-js is complete popper solution powered by [@popperjs](https://popper.js.org/).

[![npm](https://img.shields.io/npm/dt/vue-use-popperjs)](https://www.npmjs.com/package/vue-use-popperjs)

[![CI](https://github.com/iendeavor/vue-use-popperjs/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/vue-use-popperjs/actions/workflows/ci.yml)

## Features

- Built fully customizable popover with **hook function**
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

## Usage

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
