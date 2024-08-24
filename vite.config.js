import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'assets/js/main.js', // Chemin vers ton fichier d'entrée JS
    },
  },
  server: {
    // Pas de configuration de proxy ici, donc aucune ligne pour `proxy`
  },
});

