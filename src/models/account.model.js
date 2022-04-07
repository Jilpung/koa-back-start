import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import crypto from 'crypto';

const hash = (password) => {
  return crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(password)
    .digest('hex');
};

const Account = new Schema({
  profile: {
    userName: String,
    thumbnail: { type: String, default: '/thumbnail.png' },
  },
  email: { type: String },
  social: {
    kakao: {
      id: String,
      accessToken: String,
    },
  },
  password: String,
  thoughtCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

Account.statics.findByUsername = function (userName) {
  return this.findOne({ 'profile.userName': userName }).exec();
};

Account.statics.findByEmail = function (email) {
  return this.findOne({ email }).exec();
};

Account.statics.findByEmailOrUsername = function ({ userName, email }) {
  return this.findOne({
    $or: [{ 'profile.userName': userName }, { email }],
  }).exec();
};

Account.statics.localRegister = function ({ userName, email, password }) {
  const account = new this({
    profile: {
      userName,
    },
    email,
    password: hash(password),
  });

  return account.save();
};

Account.methods.validatePassword = function (password) {
  const hashed = hash(password);
  return this.password === hashed;
};

module.exports = mongoose.model('Account', Account);
