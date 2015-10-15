var
  _ = require('underscore'),
  fs = require('fs'),
  http = require('http'),
  https = require('https'),
  express = require('express'),
  bodyParser = require('body-parser'),
  vhost = require('vhost'),
  api = require('./api'),
  app = express()

process.env.HOME = '/home/ubuntu'
app.
  use(bodyParser.json()).
  use(bodyParser.urlencoded({extended: true}))
app.use(api)
app.use(function (req, res, next) {
  if (req.hostname == 'akura.co') {
    if (!req.secure)
      return res.redirect('https://' + req.hostname + req.url)
    res.set('Strict-Transport-Security', 'max-age=86400')
  }
  next()
})
_.each(['akura.co', 'afanasy.com', 'ysanafa.com', 'fanafan.us', 'fanafan.co', 'stebeneva.ru'], function (domain) {
  if (['stebeneva.ru', 'afanasy.com'].indexOf(domain) > -1)
    return app.use(vhost(domain, require(domain)))
  app.use(vhost(domain, express().use(express.static(__dirname + '/' + domain))))
})

app.use('/telegram/quoteBot/hook', require(process.env.HOME + '/quoteBot/app.js')())

http.createServer(app).listen(80)
https.createServer({
  key: fs.readFileSync(process.env.HOME + '/.akura.co/ssl/akura.co.key'),
  cert: fs.readFileSync(process.env.HOME + '/.akura.co/ssl/akura.co.crt'),
  ca: [
    fs.readFileSync(process.env.HOME + '/.akura.co/ssl/rapidSsl.crt'),
  ],
  honorCipherOrder: true,
  ciphers: [
    'ECDHE-RSA-AES256-SHA384',
    'DHE-RSA-AES256-SHA384',
    'ECDHE-RSA-AES256-SHA256',
    'DHE-RSA-AES256-SHA256',
    'ECDHE-RSA-AES128-SHA256',
    'DHE-RSA-AES128-SHA256',
    'HIGH',
    '!aNULL',
    '!eNULL',
    '!EXPORT',
    '!DES',
    '!RC4',
    '!MD5',
    '!PSK',
    '!SRP',
    '!CAMELLIA'
  ].join(':')
}, app).listen(443)
