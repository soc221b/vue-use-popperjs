<template>
  <Popper
    :popper-props="{ id: 'popcorn' }"
    :reference-props="{ id: 'tooltip' }"
    :modifiers="modifiers"
  >
    <template #reference>
      My tooltip
      <div id="arrow" data-popper-arrow></div>
    </template>
  </Popper>
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
