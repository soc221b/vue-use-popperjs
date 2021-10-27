<template>
  <Popper :modifiers="modifiers"> My tooltip </Popper>
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
