var
  _ = require('underscore'),
  express = require('express'),
  hsts = require('hsts'),
  bodyParser = require('body-parser'),
  forceDomain = require('forcedomain'),
  app = module.exports = express()

app.use(
  forceDomain({hostname: 'akura.co', protocol: 'https'}),
  hsts({maxAge: 86400}),
  bodyParser.json(),
  bodyParser.urlencoded({extended: true}),
  express.static(__dirname + '/public')
)

_.each(require('solid-config').bot, function (bot) {
  app.use('/telegram/' + bot + '/hook', require('/home/ubuntu/' + bot)())
})
