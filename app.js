var
  _ = require('underscore'),
  express = require('express'),
  vhost = require('vhost'),
  app = express()
 
_.each(['akura.co', 'afanasy.com', 'ysanafa.com', 'fanafan.us', 'fanafan.co'], function (domain) {
  app.use(vhost(domain, express().use(express.static(__dirname + '/' + domain))))  
})

app.listen(80)
