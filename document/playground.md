<script setup>
import ComponentPlayground from './components/component-playground.vue'
import HookPlayground from './components/hook-playground.vue'
import "./assets/popcorn.css";
</script>

# Playground

## Installation

```shell
yarn add vue-use-popperjs@next
```

## With Hook

<HookPlayground/>

<<< @/components/hook-playground.vue{47-56,67-102}

## With Component

<ComponentPlayground/>

<<< @/components/component-playground.vue{15-25,39-56}
