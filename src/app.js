import Koa from 'koa';
import Router from 'koa-router';
const mongoose = require('mongoose');

require('dotenv').config();

const app = new Koa();
const router = new Router();
const api = require('./api');

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection succes');
});

const port = process.env.PORT || 4000;

router.use('/api', api.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('port' + port);
});

// router.get('/', (ctx, next) => {
//   ctx.body = 'go!';
// });

// router.get('/about', (ctx, next) => {
//   ctx.body = 'gogo!';
// });

// router.get('/about/:name', (ctx, next) => {
//   const { name } = ctx.params;
//   ctx.body = name + '의 소개';
// });

// router.get('/post', (ctx, next) => {
//   {
//     const { id } = ctx.request.query;
//     if (id) {
//       ctx.body = '포스트 #' + id;
//     } else {
//       ctx.body = '포스트 아이디가 없습니다.';
//     }
//   }
// });
