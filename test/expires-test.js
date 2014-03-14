var assert = require("assert")
  , createMiddleware = require('../')
  ;

describe('expires', function () {
  describe('When req.url match the pattern', function () {
    describe('when duration is omitted', function () {
      var middleware = createMiddleware({pattern: /\.css$/})
        , req = {url: "/hoge/foo.css"}
        ;

      it('should set the default value', function (done) {
        var callCount = 0
          ;

        middleware(req, {
          setHeader: function (key, actual) {
            if (callCount === 0) {
              assert.equal(key, 'Expires');
              assert(!isNaN(Date.parse(actual)))
            }

            if (callCount === 1) {
              assert.equal(key, "Cache-Control");
              assert.equal(actual, "max-age=" + (60 * 60 * 24))
            }
            callCount++;
          }
        }, function () {
          assert.equal(callCount, 2);
          done();
        });
      });
    });

    describe('when duration is set', function () {
      var duration = 1000 * 60 * 60 * 12
        , req = {url: "/hoge/foo.css"}
        , middleware = createMiddleware({pattern: /\.css$/, duration: duration})
        ;

      it('should set the given value', function (done) {
        var callCount = 0
          ;

        middleware(req, {
          setHeader: function (key, actual) {
            if (callCount === 0) {
              assert.equal(key, 'Expires');
              assert(!isNaN(Date.parse(actual)))
            }

            if (callCount === 1) {
              assert.equal(key, "Cache-Control");
              assert.equal(actual, "max-age=" + (duration / 1000))
            }
            callCount++;
          }
        }, function () {
          assert.equal(callCount, 2);
          done();
        });
      });
    });
  });

  describe("When req.url don't match the pattern", function () {
    it('should not do anything', function (done) {
      var req = {url: "/hoge/foo.js"}
        , middleware = createMiddleware({pattern: /\.css$/, duration: 1})
        , callCount = 0
        ;

        middleware(req, {
          setHeader: function (key, actual) {
            callCount++;
          }
        }, function () {
          assert.equal(callCount, 0);
          done();
        });
    });
  });
})
