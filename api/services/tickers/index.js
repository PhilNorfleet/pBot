import mongooseService from 'feathers-mongoose';
import mongoose from 'mongoose';
import { Ticker } from '../../models';
export default function tickersService() {
  const app = this;

  const options = {
    Model: Ticker,
  };

  app.use('/tickers', mongooseService(options));
}
