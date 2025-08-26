const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const auth = require('../middleware/auth');
const authMiddleware = require('../middleware/auth');

describe('Auth Middleware', function () {

  it('should throw an error if no authorization header is present', function () {
    const req = {
      get: function () {
        return null;
      }
    }
    expect(authMiddleware.bind(this, req, {}, () => { })).to.throw('Not authenticated.')
  })

  it('should throw an error if the authorization header is only one string', function () {
    const req = {
      get: function () {
        return 'xyz'
      }
    }
    expect(authMiddleware.bind(this, req, {}, () => { })).to.throw();
  })

  it('should throw an error if the authorization header is not a valid token', function () {
    const req = {
      get: function () {
        return 'Bearer xyz'
      }
    }
    expect(authMiddleware.bind(this, req, {}, () => { })).to.throw();
  })

  it('should yield a userId after decoding a valid token', function () {
    const req = {
      get: function () {
        return 'Bearer validToken'
      }
    }
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc' });
    authMiddleware(req, {}, () => { });
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'abc');
    expect(jwt.verify.calledOnce).to.be.true;
    jwt.verify.restore();
  })


})