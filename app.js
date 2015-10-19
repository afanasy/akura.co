var
  express = require('express'),
  api = require('./api'),
  app = module.exports = express()

app.
  use(api).
  use(express.static(__dirname + '/public'))
