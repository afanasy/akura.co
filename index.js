var _ = require('underscore')
var express = require('express')
var bodyParser = require('body-parser')
var config = require('./config')

var app = module.exports = express().
  use(
    bodyParser.json(),
    bodyParser.urlencoded({extended: true}),
    express.static(__dirname + '/public')
  )

_.each(config.bot, bot => {
  try {
    app.use('/telegram/' + bot + '/hook', require(__dirname + '/../' + bot)())
  }
  catch (e) {
    console.log(e)
  }
})
