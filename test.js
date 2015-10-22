var
  expect = require('expect.js'),
  app = require('./app'),
  express = require('express')(),
  supertest = require('supertest'),
  request = require('request'),
  Akura = require('./client'),
  akura = new Akura({url: 'http://localhost:3000'}),
  client = akura,
  client2 = new Akura({url: 'http://kat.local:3000'}), // my local server
  api = require('./api'),
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
    supertest(server).
      get('/akura.co/').
      expect(200, done)
  })
})

describe('test api', function () {
  var server = supertest.agent(api)
  var expected = {
    actions: { create: true, read: true, update: true, delete: true },
    login: {
      error: false,
      message: 'Logging in successfully.',
      token: 'test'
    },
    authorized: { message: 'hello, raabbajam', token: 'test' },
    unauthorized: { message: 'hello, guest' }
  }

  describe('using basic curl', function () {
    it('returns action lists via request GET', function (done) {
      server.
        get('/action').
        expect('Content-Type', /json/).
        expect(200, expected.actions, done)
    })
    it('returns action lists via request POST', function (done) {
      server.
        post('/action').
        expect('Content-Type', /json/).
        expect(200, expected.actions, done)
    })
    it('access restricted page without logging in', function (done) {
      server.
        get('/home').
        expect(200, expected.unauthorized, done)
    })
    it('access restricted page after successfully logging in', function (done) {
      server.
        post('/login').
        send({username: 'raabbajam', password: 'test'}).
        expect(200, expected.login, function () {
          server.
            get('/home').
            expect(200, expected.authorized, done)
        })
    })
  })
  describe('using client module', function () {
    var app
    beforeEach(function () {
      app = api.listen(api.get('port') || 3000)
    })
    afterEach(function (done) {
      app.close(done)
    })
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
})
