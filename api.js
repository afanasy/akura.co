var
  express = require('express'),
  config = require('./config'),
  hosts = require('./hosts'),
  app = module.exports = express()

app.
  set('port', process.env.PORT || 3000).
  all('/action', function (req, res) {
    return res.json(config)
  }).
  get('/hosts', function (req, res) {
    return res.json(hosts)
  })
