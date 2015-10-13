var
  express = require('express'),
  config = require('./config'),
  app = module.exports = express()

app.
  set('port', process.env.PORT || 3000).
  get('/action', action).
  post('/action', action)

// dont have a parent -> called from command line
if (!module.parent) {
 app.
  listen(app.get('port'), function (){
   console.info('Express server listening on port ' + app.get('port'))
 })
}

function action (req, res) {
  return res.json(config)
}
