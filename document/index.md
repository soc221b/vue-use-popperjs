# Getting Started

Vue-popper-js is complete popper solution powered by [@popperjs](https://popper.js.org/).

[![npm](https://img.shields.io/npm/dt/vue-use-popperjs)](https://www.npmjs.com/package/vue-use-popperjs)

[![CI](https://github.com/iendeavor/vue-use-popperjs/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iendeavor/vue-use-popperjs/actions/workflows/ci.yml)

## Features

- Built custom popover with **hook function**
- (Vue 3 only) **Popper component**, with built-in support for [**Component**](https://v3.vuejs.org/api/built-in-components.html#component), [**Teleport**](https://v3.vuejs.org/api/built-in-components.html#teleport), and [**Transition**](https://v3.vuejs.org/api/built-in-components.html#transition)

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

::: warning
vue-use-popperjs@^2 only works with vue@3.
:::

## Usage

### Hook

<<< @/snippets/basic-hook.vue

::: tip
Vue-use-popperjs automatically add `.vue-use-popperjs-none` class when popper is hidden, you can add following css to hide poppers:

```css
.vue-use-popperjs-none {
  visibility: hidden;
}
```

:::

### Component

<<< @/snippets/basic-component.vue
