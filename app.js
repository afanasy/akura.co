var
  _ = require('underscore'),
  express = require('express'),
  vhost = require('vhost'),
  app = express()

var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();


_.each(['akura.co', 'afanasy.com', 'ysanafa.com', 'fanafan.us', 'fanafan.co', 'stebeneva.ru'], function (domain) {
  if (domain == 'stebeneva.ru') {
   app.use(vhost(domain, function (req, res) {
     apiProxy.web(req, res, { target: 'http://localhost:8080' })
   }))
  }
  else
    app.use(vhost(domain, express().use(express.static(__dirname + '/' + domain))))  
})

app.listen(80)
