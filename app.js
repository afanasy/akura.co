var
  _ = require('underscore'),
  express = require('express'),
  vhost = require('vhost'),
  app = express()

process.env.HOME = '/home/ubuntu'
_.each(['akura.co', 'afanasy.com', 'ysanafa.com', 'fanafan.us', 'fanafan.co', 'stebeneva.ru'], function (domain) {
  if (domain == 'stebeneva.ru')
    return app.use(vhost(domain, require(domain)))
  app.use(vhost(domain, express().use(express.static(__dirname + '/' + domain))))  
})

app.listen(80)
