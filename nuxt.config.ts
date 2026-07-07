// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  plugins: ["~/plugins/gsap.client.ts"],

  modules: ["@nuxtjs/i18n", "@nuxtjs/tailwindcss"],

  i18n: {
    locales: [
      { code: "zh", name: "中文", file: "zh.json" },
      { code: "en", name: "English", file: "en.json" },
    ],
    defaultLocale: "en",
    langDir: "locales/",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      cookieCrossOrigin: false,
      alwaysRedirect: false,
    },
  },

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
