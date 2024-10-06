import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "signature-generator",
  build: {
    outDir: "dist",
    assetsDir: "",
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
