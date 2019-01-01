const pkg = require('./package')
require('dotenv').config()
module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    ['nuxt-fire', {
      useOnly: ['auth', 'firestore'],
      config: {
        development: {
          apiKey: process.env.FIRE_API_KEY,
          databaseURL: process.env.FIRE_DATABASE_URL,
          projectId: process.env.FIRE_PROJECT_ID,
          authDomain: process.env.FIRE_AUTH_DOMAIN,
          storageBucket: '',
          messagingSenderId: ''
        },
        production: {
          apiKey: process.env.FIRE_API_KEY,
          databaseURL: process.env.FIRE_DATABASE_URL,
          projectId: process.env.FIRE_PROJECT_ID,
          authDomain: process.env.FIRE_AUTH_DOMAIN,
          storageBucket: '',
          messagingSenderId: ''
        }
      }
    }]
  ],
  router: {
    middleware: 'router-auth'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
