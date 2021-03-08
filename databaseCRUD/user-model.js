const {Schema, model} = require('mongoose');
const UserSchema = Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  }
}, {
  collection: 'users'
});

module.exports =  model('User', UserSchema);