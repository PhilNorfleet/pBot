import users from './users';
import tickers from './tickers'
export default function services() {
  const app = this;
  app.configure(tickers)
  app.configure(users);
}
