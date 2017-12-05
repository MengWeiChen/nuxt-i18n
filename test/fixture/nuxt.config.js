module.exports = {
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  modules: [
    ['@@', {
      locales: [
        {
          code: 'en',
          iso: 'en-US',
          name: 'English'
        },
        {
          code: 'fr',
          iso: 'fr-FR',
          name: 'Français'
        }
      ],
      defaultLocale: 'en',
      vueI18n: {
        messages: {
          fr: {
            home: 'Accueil',
            about: 'À propos'
          },
          en: {
            home: 'Homepage',
            about: 'About us'
          }
        },
        fallbackLocale: 'en'
      },
      routes: {
        about: {
          fr: '/a-propos',
          en: '/about-us'
        },
        category: {
          fr: '/categorie'
        },
        'category-slug': {
          fr: '/categorie/:slug'
        }
      }
    }]
  ]
}
