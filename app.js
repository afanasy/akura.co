var
  express = require('express'),
  hsts = require('hsts'),
  quoteBot = require('quoteBot'),
  api = require('./api'),
  app = module.exports = express()

app.
  use(api).
  use('/telegram/quoteBot/hook', quoteBot()).
  use(hsts({ maxAge: 86400 })).
  use(express.static(__dirname + '/public'))
