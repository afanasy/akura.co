var
  expect = require('expect'),
  request = require('supertest'),
  Akura = require('./client'),
  akura = new Akura({url: 'http://localhost:3000'}),
  client = akura,
  client2 = new Akura({url: 'http://kat.local:3000'}), // my local server
  api = require('./api'),
  server;
describe('Server', function () {
  var expected = { "create": true, "read": true, "update": true, "delete": true }

  beforeEach(function () {
    server = api.listen(api.get('port') || 3000)
  })
  afterEach(function (done) {
    server.close(done);
  })
  describe('using basic curl', function () {
    it('return action lists via request GET', function (done) {
      request(server).
        get('/action').
        expect('Content-Type', /json/).
        expect(200, expected, done)
    })
    it('return action lists via request POST', function (done) {
      request(server).
        post('/action').
        expect('Content-Type', /json/).
        expect(200, expected, done)
    })
  })
  describe('using client module', function () {
    it('return action lists via action method', function (done) {
      client.action(function (err, data) {
        if (err) return done(err)
        expect(data).toEqual(expected)
        done()
      })
    })
    it('return action lists via call method (test GET)', function (done) {
      client.call('action', function (err, data) {
        if (err) return done(err)
        expect(data).toEqual(expected)
        done()
      })
    })
    it('return action lists via call method (test POST)', function (done) {
      client.call({url: 'action', method: 'post'}, function (err, data) {
        if (err) return done(err)
        expect(data).toEqual(expected)
        done()
      })
    })
  })
  describe('test another server', function () {
    it('return action lists via action method', function (done) {
      client2.action(function (err, data) {
        if (err) return done(err)
        expect(data).toEqual(expected)
        done()
      })
    })
  })
})
