// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/vello.css'],
  ssr: false,
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  ui: {
    icons: ['mdi'],
  }
})