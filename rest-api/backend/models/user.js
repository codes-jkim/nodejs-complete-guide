const mongoose = require('mongoose');
const { required } = require('../../frontend/src/util/validators');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Newbie!',
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
})

module.exports = mongoose.model('User', userSchema);