"use strict";

(function() {
  var
    root = this,
    previousAkuraClient = root.akuraClient,
    akuraApiUrl = 'http://localhost:3000',
    akuraClient = {
      init: init,
      getActions: getActions,
      noConflict: noConflict,
    },
    has_require = typeof require !== 'undefined',
    $ = root.jQuery

    if( typeof $ === 'undefined' ) {
      if( has_require ) {
        $ = require('request')
      }
      else throw new Error('mymodule requires jQuery');
    }

    function init(opts) {
      if (opts.url) {
        akuraApiUrl = url
      }
    }

    function getActions(callback) {
      var
        err,
        data,
        args
      $.get(akuraApiUrl + "/action", function () {
        args = arguments

        if (has_require) {
          try {
            data = JSON.parse(arguments[2])
          } catch (e) {
            data = []
          }
        } else {
          data = arguments[0]
        }

        return callback( null, data )
      })
    }

    // can be used to return to previoues version or other akuraClient
    function noConflict() {
      root.akuraClient = previousAkuraClient
      return akuraClient
    }

    // check if client is used in common.js api (node, browserify, jetpack)
    if( typeof exports !== 'undefined' ) {
      if( typeof module !== 'undefined' && module.exports ) {
        exports = module.exports = akuraClient
      }
      exports.akuraClient = akuraClient
      $  = require('request')
    } else root.akuraClient = akuraClient

}).call(this);
