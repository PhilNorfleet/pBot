import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import compression from 'compression';
import bodyParser from 'body-parser';
import plnx from 'plnx';

// plnx.push(function(session) {
//   session.subscribe("ticker", function(data){
//     console.log(data);
//   });
// });
const app = express();
// gzip compression
app.use(compression());


const router = express.Router();

// let poloniex = new Poloniex(process.env.POLONIEX_PUBLIC_KEY, process.env.POLONIEX_SECRET_KEY, { socketTimeout: 15000 });
// let cryptowatch = new Cryptowatch();
// axios.get('https://api.cryptowat.ch/markets').then((res, err) => {
//   console.log(res, err)
// })
const port = process.env.API_PORT || 3001;

//db config (mLab)
mongoose.connect(`mongodb://${process.env.MLAB_DBUSER}:${process.env.MLAB_DBPASSWORD}@ds115071.mlab.com:15071/pbot-dev`)
//configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, set
// headers to allow CORS with middleware:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
// remove cacheing to get most recent entries
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

// set XMLHttpRequest headers for coinigy
// axios.defaults.baseURL = 'https://api.coinigy.com/api/v1/';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.common['X-API-KEY'] = '457f46ec2a10fb3baa4c76c567844612';
// axios.defaults.headers.common['X-API-SECRET'] = 'db535f6f0f75021d13237df32d9fc8d0';
// axios.post('/data', {
//   exchange_code: 'PLNX',
//   exchange_market: 'BTC/USDT',
//   type: 'history'
// }).then((response) => {
//   console.log(response.data.data
//     )

//   // console.log(response.headers)
//   // console.log(response.config)
// })


// request.send();
//set the route path & initialize the API
// router.get('/', function(req, res) {
//  res.json({ message: 'API Initialized!'});
// });

// Routes Go Here
const respondWorld = (req, res, pair) => {
  console.log(pair)
  res.send(pair)
}
router.route('/getTrades')
.post((req, res) => {
  respondWorld(req, res, req.body.data.pair)
})


//Use our router configuration when we call /api
app.use('/', router);

//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
