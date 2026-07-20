import { defineConfig } from 'vite';

export default defineConfig({
  base: '/cal-menut/',
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
});
