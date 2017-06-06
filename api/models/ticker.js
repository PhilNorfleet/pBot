import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tickerSchema = new Schema({
  currencyPair: String,
  last: Number,
  lowestAsk: Number,
  highestBid: Number,
  percentChange: Number,
  baseVolume: Number,
  quoteVolume: Number,
  isFrozen: Number,
  dailyHigh: Number,
  dailyLow: Number
});
const Ticker = mongoose.model('Ticker', tickerSchema);
export default Ticker
