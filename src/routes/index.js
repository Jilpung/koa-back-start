import Router from 'koa-router';

const api = new Router();
const books = require('../controllers');
const auth = require('../controllers');

api.use('/books', books.routes());
api.use('/auth', auth.routes());

module.exports = api;
