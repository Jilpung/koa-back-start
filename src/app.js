import Koa from 'koa';
import Router from 'koa-router';
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

require('dotenv').config();

const app = new Koa();
const router = new Router();
const api = require('./routes');

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

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('port' + port);
});
