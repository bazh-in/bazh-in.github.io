require('dotenv').config();
module.exports = {
  head: {
    title: 'XuRMa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700,800,900&display=swap&subset=cyrillic,cyrillic-ext' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },
  loading: { color: '#fb920b' },
  loadingIndicator: {
    name: 'pulse',
    color: '#fb920b'
  },
  css: [
    '@/assets/styles/main.scss'
  ],
  mode: 'spa',
  router: {
    base: '/xurma-web/'
  },
  modules: [
    [ '@nuxtjs/vuetify',
      '@nuxtjs/sitemap', {
      hostname: 'http://xurma-web.herokuapp.com',
      path: '/sitemap.xml',
      generate: true
    }]
  ],
  vuetify: {
    /*theme: {
      primary: '#FF9800',
      success: '#FF9800',
      secondary: '#FF9800',
      accent: '#FF9800'
    }*/
  },
  plugins: [
    '~plugins/vuelidate.js'
  ],
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        })
      }
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['>= 5%', 'IE >= 10', 'Safari >= 9']
      })
    ],
    babel: {
      plugins: [
        ['wildcard']
      ]
    }
  },
  env: {
    API_URL: process.env.API_URL
  }
};
