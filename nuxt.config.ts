// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  plugins: ["~/plugins/gsap.client.ts"],

  modules: ["@nuxtjs/tailwindcss"],

  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inria+Serif:wght@300;400;700&family=Noto+Serif+TC:wght@200..900&display=swap",
        },
      ],
    },
  },
});
