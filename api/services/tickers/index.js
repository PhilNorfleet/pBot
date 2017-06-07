import mongooseService from 'feathers-mongoose';
import hooks from './hooks'
import { Ticker } from '../../models';
export default function tickersService() {
  const app = this;

  const options = {
    name: 'ticker',
    Model: Ticker,
  };

  app.use('tickers', mongooseService(options));
  app.service('tickers').hooks(hooks);
}
