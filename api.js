var
  express = require('express'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  app = module.exports = express()

app.
  use(bodyParser.json()).
  use(bodyParser.urlencoded({extended: true})).
  set('port', process.env.PORT || 3000).
  get('/action', function (req, res) {
    return res.json(config)
  })

// dont have a parent -> called from command line
if (!module.parent) {
 app.
  listen(app.get('port'), function(){
   console.info('Express server listening on port ' + app.get('port'))
 })
}
