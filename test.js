var
  expect = require('expect.js'),
  request = require('supertest'),
  Akura = require('./client'),
  akura = new Akura({url: 'http://localhost:3000'}),
  client = akura,
  client2 = new Akura({url: 'http://kat.local:3000'}), // my local server
  api = require('./api'),
  server

describe('Server', function () {
  var expected = {
    actions: { create: true, read: true, update: true, delete: true },
    hosts: [ "akura.co", "afanasy.com", "ysanafa.com", "fanafan.us", "fanafan.co", "stebeneva.ru" ]
  }

  beforeEach(function () {
    server = api.listen(api.get('port') || 3000)
  })
  afterEach(function (done) {
    server.close(done)
  })
  describe('using basic curl', function () {
    it('returns action lists via request GET', function (done) {
      request(server).
        get('/action').
        expect('Content-Type', /json/).
        expect(200, expected.actions, done)
    })
    it('returns action lists via request POST', function (done) {
      request(server).
        post('/action').
        expect('Content-Type', /json/).
        expect(200, expected.actions, done)
    })
    it('returns host lists via request GET', function (done) {
      request(server).
        get('/hosts').
        expect('Content-Type', /json/).
        expect(200, [
          "akura.co",
          "afanasy.com",
          "ysanafa.com",
          "fanafan.us",
          "fanafan.co",
          "stebeneva.ru"
        ]
, done)
    })
  })
  describe('using client module', function () {
    it('returns action lists via `action` method', function (done) {
      client.action(function (err, data) {
        if (err) return done(err)
        expect(data).to.eql(expected.actions)
        done()
      })
    })
    it('returns action lists via call method (test GET)', function (done) {
      client.call('action', function (err, data) {
        if (err) return done(err)
        expect(data).to.eql(expected.actions)
        done()
      })
    })
    it('returns action lists via call method (test POST)', function (done) {
      client.call({url: 'action', method: 'post'}, function (err, data) {
        if (err) return done(err)
        expect(data).to.eql(expected.actions)
        done()
      })
    })
    it('returns host lists via `hosts` method', function (done) {
      client.hosts(function (err, hosts) {
        if (err) return done(err)
        expect(hosts).to.eql(expected.hosts)
        done()
      })
    })
  })
  describe('test another server', function () {
    it('returns action lists via `action` method to client2', function (done) {
      client2.action(function (err, data) {
        if (err) return done(err)
        expect(data).to.eql(expected.actions)
        done()
      })
    })
  })
  describe('add all available calls after calling `action`', function () {
    it('returns action lists via `action` method and attaches available calls ' +
      'to client', function (done) {
      client.action(function (err, data) {
        if (err) return done(err)
        expect(data).to.eql(expected.actions)
        expect(client.create).to.be.ok()
        expect(client.read).to.be.ok()
        expect(client.update).to.be.ok()
        expect(client.delete).to.be.ok()
        done()
      })
    })
  })
})
