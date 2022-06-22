const { Schema, model } = require('mongoose');

/**
 * Schema for the User model.
 */
const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

UserSchema.virtual('fullName').get(function () { return `${this.name} ${this.lastname}` });

UserSchema.methods.toJSON = function () {
  const { __v, _id, password, name, lastname, ...user } = this.toObject();
  return {
    uid: _id,
    fullName: this.fullName,
    ...user
  };
}

module.exports = model('User', UserSchema);
