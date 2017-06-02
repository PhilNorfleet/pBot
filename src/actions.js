// Action types

export const SELECT_TICKER_EXCHANGE = 'SELECT_TICKER_EXCHANGE'

// Action creators

export function selectTickerExchange(tickerExchange) {
  return { type: SELECT_TICKER_EXCHANGE, tickerExchange }
}






