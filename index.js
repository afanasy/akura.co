var
  express = require('express'),
  hsts = require('hsts'),
  bodyParser = require('body-parser'),
  quoteBot = require('quote-bot'),
  podskazkaBot = require('podskazka-bot'),
  hkdBot = require('hkd-bot'),
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
app.use('/telegram/podskazkaBot/hook', podskazkaBot())
app.use('/telegram/hkdBot/hook', hkdBot())
