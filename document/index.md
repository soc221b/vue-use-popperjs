# Getting Started

## Installation

For vue@3:

```shell
$ yarn add vue-use-popperjs
```

For vue@2 + @vue/composition-api

```shell
$ yarn add vue-use-popperjs @vue/composition-api
```

## Usage

### Component

```html
<template>
  <div id="root">
    <Popper popper-id="popcorn" reference-id="tooltip" :modifiers="modifiers">
      <template #reference>
        My tooltip
        <div id="arrow" data-popper-arrow></div>
      </template>
    </Popper>
  </div>
</template>

<script setup lang="ts">
  import { Popper } from "vue-use-popperjs";

  const modifiers = [
    {
      name: "offset",
      options: {
        offset: [0, 8],
      },
    },
  ];
</script>
```

### Hook

```html
<template>
  <div id="root">
    <div ref="popcorn" id="popcorn" aria-describedby="tooltip"></div>
    <div v-show="visible" ref="tooltip" id="tooltip" role="tooltip">
      My tooltip
      <div id="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { usePopperjs } from "../../src";

  const popcorn = ref();
  const tooltip = ref();
  const { visible } = usePopperjs(popcorn, tooltip, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
</script>
```
