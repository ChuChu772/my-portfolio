// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "cloudflare-pages",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  plugins: ["~/plugins/gsap.client.ts"],

  modules: ["@nuxtjs/tailwindcss"],

  app: {
    head: {
      title: "PiPiChouPortfolio",
      meta: [
        {
          name: "PiPi made",
          content:
            "Interactive portfolio featuring UI/UX design, creative coding, and visual storytelling projects.",
        },
        {
          property: "og:title",
          content: "PiPiChouPortfolio",
        },
        {
          property: "og:image",
          content: "/book/illu.png",
        },
      ],
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

        {
          rel: "icon",
          href: "/fav.png",
        },
      ],
    },
  },
});
