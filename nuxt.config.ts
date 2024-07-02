// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/vello.css'],
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  ui: {
    global: true,
    icons: ['mdi']
  }
})