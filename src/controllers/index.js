import Router from 'koa-router';

const books = new Router();
const auth = new Router();
const booksCtrl = require('./books.controller');
const commentsCtrl = require('./comments.controller');
const authCtrl = require('./auth.controller');

books.get('/', booksCtrl.list);
books.get('/:id', booksCtrl.get);
books.post('/', booksCtrl.create);
books.delete('/:id', booksCtrl.delete);
books.put('/:id', commentsCtrl.replace);
books.patch('/:id', commentsCtrl.update);

auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);
auth.get('/exists/:key(email|username)/:value', authCtrl.exists);
auth.post('/logout', authCtrl.logout);

module.exports = (books, auth);
