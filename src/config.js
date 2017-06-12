require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'pBot',
    description: 'Build a crypto-trading bot during your lunch break.',
    head: {
      titleTemplate: 'React Redux Example: %s',
      meta: [
        { name: 'description', content: 'Build a crypto-trading bot during your lunch break' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'pBot' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'pBot' },
        { property: 'og:description', content: 'Build a crypto-trading bot during your lunch break' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@PhilNorfleet' },
        { property: 'og:creator', content: '@PhilNorfleet' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  }
}, environment);
