//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const Poloniex = require('poloniex-api-node');
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set
//it up, or 3001

let poloniex = new Poloniex(process.env.POLONIEX_PUBLIC_KEY, process.env.POLONIEX_SECRET_KEY, { socketTimeout: 15000 });
var port = process.env.API_PORT || 3001;

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
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//remove cacheing so to get most recent entries
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

//set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

//add /<route_name> to /api router
router.route('/currencies').get((req, res) => {
  poloniex.returnCurrencies((err, data) => {
    res.json(data);
  });
});

router.route('/tickers').get((req,res) => {
  poloniex.returnTicker((err, data) => {
    res.json(data)
  })
})

router.route('/chart/:pair/:period/:start/:end').get((req,res) => {
    poloniex.returnChartData(req.params.pair, req.params.period, req.params.start, req.query.end, function (err, data) {
        res.json(data);
    });
})

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
