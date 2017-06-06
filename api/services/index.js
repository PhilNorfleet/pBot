import users from './users';
import messages from './messages';
import tickers from './tickers'
export default function services() {
  const app = this;
  app.configure(tickers)
  app.configure(users);
  app.configure(messages);
}
