var
  express = require('express'),
  config = require('./config'),
  app = module.exports = express()

app.
  set('port', process.env.PORT || 3000).
  all('/action', function (req, res) {
    return res.json(config)
  })
