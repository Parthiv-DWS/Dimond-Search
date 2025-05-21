import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      "/graphql": {
        target: "https://diamond-search-m2.demoproject.info",
        changeOrigin: true,
        secure: false, // Ignore SSL issues in dev
        rewrite: (path) => path.replace(/^\/graphql/, "/graphql"),
      },
    },
  },
});
