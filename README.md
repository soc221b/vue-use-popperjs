# vue-use-popperjs

Vue composable based on [@popperjs/core](https://popper.js.org/)

## Installation

```sh
npm i vue-use-popperjs@^3
```

## Usage

Use with native elements:

```html
<script setup lang="ts">
  import { ref } from "vue";
  import { usePopperjs } from "vue-use-popperjs";

  const reference = ref<null | Element>(null);
  const popper = ref<null | HTMLElement>(null);
  const { instance } = usePopperjs({ reference, popper });
</script>

<template>
  <button ref="reference" aria-describedby="tooltip">I'm a button</button>
  <span ref="popper" role="tooltip">I'm a tooltip</span>
</template>
```

Use with components:

```html
<script setup lang="ts">
  import { ref, type ComponentPublicInstance } from "vue";
  import { usePopperjs } from "vue-use-popperjs";

  const reference = ref<null | ComponentPublicInstance>(null);
  const popper = ref<null | ComponentPublicInstance>(null);
  const { instance } = usePopperjs({ reference, popper });
</script>

<template>
  <MyButton ref="reference">Reference</MyButton>
  <MyToolTip ref="popper">Popcorn</MyToolTip>
</template>
```
