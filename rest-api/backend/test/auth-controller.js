const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controllers/auth');


describe('Auth Controller', function () {
  before(function (done) {
    mongoose
      .connect(process.env.MONGODB_URI_TEST).then(() => {
        const user = new User({
          email: 'test@test.com',
          password: 'tester',
          name: 'Test',
          posts: [],
          _id: '68a5a27b494fe2d754ff85d1'
        })
        return user.save();
      })
      .then(() => {
        done();
      })
  })

  it('should throw an error with code 500 if accessing the database fails', function (done) {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
      body: { email: 'test@test.com', password: 'test' }
    }

    AuthController.login(req, {}, () => { }).then(result => {
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 500);
      done();
    })

    User.findOne.restore();
  })

  it('should send a response with a valid user status for an existing user', function () {
    const req = { userId: '68a5a27b494fe2d754ff85d1' };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      }
    }
    AuthController.getUserStatus(req, res, () => { }).then((done) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.userStatus).to.be.equal('Newbie!');
      done()
    })
  })

  after(function (done) {
    User.deleteMany({}).then(() => {
      return mongoose.disconnect();
    }).then(() => {
      done();
    })
  })
})