<template>
  <Popper
    :reference-props="{ id: 'popcorn' }"
    :popper-props="{ id: 'tooltip' }"
    :modifiers="modifiers"
  >
    My tooltip
    <div id="arrow" data-popper-arrow></div>
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
