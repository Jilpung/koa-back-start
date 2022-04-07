import Joi from 'joi';
import Account from '../models/account.model';

// 로컬 회원가입
exports.localRegister = async (ctx) => {
  const schema = Joi.object().keys({
    userName: Joi.string().alphanum().min(4).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  });

  const validation = schema.validate(ctx.body);
  if (validation.error) {
    ctx.status = 400;
    return;
  }

  let existing = null;
  try {
    existing = await Account.findByEmailOrUsername(ctx.request.body);
  } catch (e) {
    ctx.throw(500, e);
  }

  if (existing) {
    ctx.status = 409;
    ctx.body = {
      key: existing.email === ctx.request.body.email ? 'email' : 'userName',
    };
    return;
  }

  let account = null;
  try {
    account = await Account.localRegister(ctx.request.body);
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = account.profile;
};

// 로컬 로그인
exports.localLogin = async (ctx) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const validation = schema.validate(ctx.body);

  if (validation.error) {
    ctx.status = 400;
    return;
  }

  const { email, password } = ctx.request.body;

  let account = null;
  try {
    account = await Account.findByEmail(email);
  } catch (e) {
    ctx.throw(500, e);
  }

  if (!account || !account.validatePassword(password)) {
    ctx.status = 403;
    return;
  }

  ctx.body = account.profile;
};

exports.exists = async (ctx) => {
  const { key, value } = ctx.params;
  let account = null;

  try {
    account = await (key === 'email'
      ? Account.findByEmail(value)
      : Account.findByUsername(value));
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = {
    exists: account !== null,
  };
};

// 로그아웃
exports.logout = async (ctx) => {
  ctx.body = 'logout';
};