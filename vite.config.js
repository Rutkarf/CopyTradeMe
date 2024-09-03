import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "./package.json", // Chemin vers ton fichier d'entrée JS
    },
  },
  server: {
    // Pas de configuration de proxy ici, donc aucune ligne pour `proxy`
  },
});
