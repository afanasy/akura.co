var
  express = require('express'),
  hsts = require('hsts'),
  bodyParser = require('body-parser'),
  quoteBot = require('quote-bot'),
  api = require('./api'),
  app = module.exports = express()

app.use(
  hsts({maxAge: 86400}),
  bodyParser.json(),
  bodyParser.urlencoded({extended: true}),
  express.static(__dirname + '/public'),
  api
)

app.use('/telegram/quoteBot/hook', quoteBot())
