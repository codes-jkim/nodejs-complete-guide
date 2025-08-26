const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const Post = require('../models/post');
const FeedController = require('../controllers/feed');

describe('Feed Controller', function () {
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

  it('should add a created post to the posts of the creator', function () {

    const req = {
      body: {
        title: 'Test Post',
        content: 'This is a test post.',
      },
      file: {
        path: 'abc'
      },
      userId: '68a5a27b494fe2d754ff85d1'
    }
    const res = {
      status: function () {
        return this;
      }, json: function () { }
    };

    FeedController.createPost(req, res, () => { }).then((savedUser) => {
      expect(savedUser).to.have.property('posts');
      expect(savedUser.posts).to.have.length(1);
      done();
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