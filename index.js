var _ = require('underscore')
var express = require('express')
var bodyParser = require('body-parser')
var superagent = require('superagent')
var config = require('./config')
var setWebhook

var app = module.exports = express().
  use(
    bodyParser.json(),
    bodyParser.urlencoded({extended: true}),
    express.static(__dirname + '/public')
  )

_.each(config.bot, bot => {
  try {
    var path = '/telegram/' + bot + '/hook'
    if (setWebhook) {
      var token = require(__dirname + '/../.' + bot).token
      var hook = 'https://akura.co' + path
      superagent.get('https://api.telegram.org/bot' + token + '/setWebhook').query({url: hook}).end((err, res) => {
        if (err)
          return console.log('setWebhook', hook, err)
        console.log('setWebhook', hook, res.body)
      })
    }
    app.use(path, require(__dirname + '/../' + bot)())
  }
  catch (e) {
    console.log(bot, e)
  }
})
