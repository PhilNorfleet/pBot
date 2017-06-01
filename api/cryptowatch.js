var axios = require('axios');
function getResult (url, options) {
  return axios.get(url, options)
    .then(res => { return res.data.result })
    .catch(err => { throw new TypeError('This endpoint does not exist') })
}

class Cryptowatch {

  constructor (options = {}) {
    this.url = 'https://api.cryptowat.ch'
    this.options = Object.assign({
      // the cryptowatch api times out
      // when incorrect params supplied
      // todo: ask them why
      timeout: 5000
    }, options)
  }

  // https://cryptowat.ch/docs/api#rate-limit
  allowance () {
    return axios.get(this.url)
      .then(r => { return r.json() })
      .then(j => { return j.allowance })
  }

  // https://cryptowat.ch/docs/api
  markets (exchange) {
    console.log(exchange)
    return exchange ? getResult(`${this.url}/markets/${exchange}`) : getResult(`${this.url}/markets`)
  }

  // https://cryptowat.ch/docs/api#price
  price (coin, currency = 'usd', market = 'coinbase') {
    return getResult(`${this.url}/markets/${market}/${coin}${currency}/price`, this.options)
  }

  // https://cryptowat.ch/docs/api#summary
  summary (coin, currency = 'usd', market = 'coinbase') {
    return getResult(`${this.url}/markets/${market}/${coin}${currency}/summary`, this.options)
  }

  // https://cryptowat.ch/docs/api#trades
  trades (coin, currency = 'usd', market = 'coinbase') {
    return getResult(`${this.url}/markets/${market}/${coin}${currency}/trades`, this.options)
  }

  // https://cryptowat.ch/docs/api#orderbook
  orderbook (coin, currency = 'usd', market = 'coinbase') {
    return getResult(`${this.url}/markets/${market}/${coin}${currency}/orderbook`, this.options)
  }

  // https://cryptowat.ch/docs/api#ohlc
  ohlc (coin, currency = 'usd', market = 'coinbase') {
    return getResult(`${this.url}/markets/${market}/${coin}${currency}/ohlc`, this.options)
  }

  // https://cryptowat.ch/docs/api#prices
  prices () {
    return getResult(`${this.url}/markets/prices`, this.options)
  }

  // https://cryptowat.ch/docs/api#summaries
  summaries () {
    return getResult(`${this.url}/markets/summaries`, this.options)
  }
}

module.exports = Cryptowatch
