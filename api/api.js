import feathers from 'feathers';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import socketio from 'feathers-socketio';
import isPromise from 'is-promise';
import PrettyError from 'pretty-error';
import config from './config';
import middleware from './middleware';
import services from './services';
import * as actions from './actions';
import { mapUrl } from './utils/url.js';
import auth, { socketAuth } from './services/authentication';
import mongoose from 'mongoose';
import plnx from 'plnx';
import * as models from './models'
const { Ticker } = models;

process.on('unhandledRejection', error => console.error(error));

const pretty = new PrettyError();
const app = feathers();

app.set('config', config)
  .use(morgan('dev'))
  .use(cookieParser())
  .use(session({
    secret: 'react and redux rule!!!!',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 120000 }
  }))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json());

const actionsHandler = (req, res, next) => {
  const separatedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const { action, params } = mapUrl(actions, separatedUrlPath);

  req.app = app;

  const catchError = error => {
    console.error('API ERROR:', pretty.render(error));
    res.status(error.status || 500).json(error);
  };

  if (action) {
    try {
      const handle = action(req, params);
      (isPromise(handle) ? handle : Promise.resolve(handle))
        .then(result => {
          if (result instanceof Function) {
            result(res);
          } else {
            res.json(result);
          }
        })
        .catch(reason => {
          if (reason && reason.redirect) {
            res.redirect(reason.redirect);
          } else {
            catchError(reason);
          }
        });
    } catch (error) {
      catchError(error);
    }
  } else {
    next();
  }
};

app.configure(hooks())
  .configure(rest())
  .configure(socketio({ path: '/ws' }))
  .configure(auth)
  .use(actionsHandler)
  .configure(services)
  .configure(middleware);

if (process.env.APIPORT) {
  app.listen(process.env.APIPORT, err => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', process.env.APIPORT);
    console.info('==> 💻  Send requests to http://localhost:%s', process.env.APIPORT);
  });
} else {
  console.error('==>     ERROR: No APIPORT environment variable has been specified');
}

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

app.io.use(socketAuth(app));

app.io.on('connection', socket => {
  const user = socket.feathers.user ? { ...socket.feathers.user, password: undefined } : undefined;
  socket.emit('news', { msg: '\'Hello World!\' from server', user });

  socket.on('history', () => {
    for (let index = 0; index < bufferSize; index++) {
      const msgNo = (messageIndex + index) % bufferSize;
      const msg = messageBuffer[msgNo];
      if (msg) {
        socket.emit('msg', msg);
      }
    }
  });
  socket.on('msg', data => {
    const message = { ...data, id: messageIndex };
    messageBuffer[messageIndex % bufferSize] = message;
    messageIndex++;
    app.io.emit('msg', message);
  });
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://pbotdev:password@ds115071.mlab.com:15071/pbot-dev').then((connection) => {

plnx.push((session) => {
  console.log('subscribing to tickers')
  session.subscribe("ticker", (ticker) => {
    const splitCurrencyPair = ticker[0].split('_')
    const tickerData = {
        exchange: 'poloniex',
        asset: splitCurrencyPair[0],
        coin: splitCurrencyPair[1],
        last: ticker[1],
        lowestAsk: ticker[2],
        highestBid: ticker[3],
        percentChange: ticker[4],
        baseVolume: ticker[5],
        quoteVolume: ticker[6],
        isFrozen: ticker[7],
        dailyHigh: ticker[8],
        dailyLow: ticker[9]
    }
    const query = {
      exchange: 'poloniex',
      asset: splitCurrencyPair[0],
      coin: splitCurrencyPair[1]
    };
    app.service('tickers').find({query: query}).then((result) => {
      const tickerExists = result.length ? result.length : 0
      if (tickerExists === 0) {
        app.service('tickers').create(tickerData);
      }
      else if (tickerExists === 1) {
        app.service('tickers').patch(result[0]._id, tickerData);
      }
      else {
        console.log(result[0])
        app.service('tickers').remove(result[0]._id)
      }
    })
  });
});

})

