import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/vue-use-popperjs.ts",
      formats: ["cjs", "es", "umd"],
      name: "VueUsePopperjs",
    },
    sourcemap: true,
    rollupOptions: {
      external: ["vue", "@popperjs/core"],
      output: {
        globals: {
          vue: "Vue",
          "@popperjs/core": "Popper",
        },
      },
    },
  },
  plugins: [vue(), dts()],
});
