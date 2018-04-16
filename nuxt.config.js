const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'edusanjal',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nepal&apos;s leading education portal'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  css: [
    'assets/scss/main.scss'
  ],
  plugins: ['~/plugins/axios.js'],
  env: {
    API_URL: isDev ? 'http://127.0.0.1:8000' : 'https://api.edusanjal.com/'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['axios',],
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
};
