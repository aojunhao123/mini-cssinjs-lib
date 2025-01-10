import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "example",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3111,
  },
});
