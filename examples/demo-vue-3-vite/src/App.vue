<template>
  <div id="root">
    <div ref="popcorn" id="popcorn" aria-describedby="tooltip"></div>
    <div ref="tooltip" id="tooltip" role="tooltip">
      My tooltip
      <div id="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { usePopperjs } from "vue-use-popperjs";

export default defineComponent({
  setup() {
    const popcorn = ref();
    const tooltip = ref();
    usePopperjs(popcorn, tooltip, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    });

    return {
      popcorn,
      tooltip,
    };
  },
});
</script>

<style>
#root {
  background-color: #30263d;
  font-family: -apple-system, Helvetica Neue, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Open Sans, sans-serif;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 220px;
}

#popcorn {
  display: inline-block;
  width: 134px;
  height: 120px;
  background-image: url("https://popper.js.org/images/popcorn-box.svg");
}

#tooltip {
  display: inline-block;
  background: #ffffff;
  color: #643045;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 4px;
}

#tooltip.vue-use-popperjs-none,
#tooltip.vue-use-popperjs-none #arrow::before {
  display: none;
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
