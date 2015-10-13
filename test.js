var
  expect = require('chai').expect,
  request = require('supertest'),
  client = require('./client'),
  api = require('./api'),
  server;
describe('Server', function () {
  beforeEach(function () {
    server = api.listen(api.get('port') || 3000)
  })
  afterEach(function (done) {
    server.close(done);
  })
  var expected = [ 'create', 'read', 'update', 'delete' ]
  describe.skip('using basic curl', function () {
    it('should return action lists via request', function (done) {
      request(server).
        get('/action').
        expect('Content-Type', /json/).
        expect(200, expected, done)
    })
  })
  describe('using client module', function () {
    it('should return action lists via request', function (done) {
      client.getActions(function (err, data) {
        if (err) return done(err)
        expect(data).to.deep.eq(expected)
        done()
      })
    })
  })

})
