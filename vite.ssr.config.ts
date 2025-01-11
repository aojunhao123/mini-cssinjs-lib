import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    ssr: true,
    rollupOptions: {
      input: {
        client: resolve(__dirname, "example/client.ts"),
        ssr: resolve(__dirname, "example/ssr.ts"),
      },
      output: {
        dir: "dist-ssr",
        entryFileNames: "[name].js",
      },
    },
  },
  server: {
    port: 3009,
  },
});
