var
  app = require('./app'),
  express = require('express')(),
  request = require('supertest'),
  server

  express.use('/akura.co', app)

describe('test mount', function () {
  beforeEach(function () {
    server = express.listen(express.get('port') || 3000)
  })
  afterEach(function (done) {
    server.close(done)
  })
  it('mounted from other express app', function (done) {
    request(server).
      get('/akura.co/').
      expect(function (res) {
        console.log(res.text);
      }).
      expect(200, done)
  })
})
