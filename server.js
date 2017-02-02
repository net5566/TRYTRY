/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import passport from 'passport';


import api from './src/api/';
import config from './webpack.config';
// import dbConfigFile from './config/config';

// const dbConfig = dbConfigFile['development'];
require('./server/models').connect('mongodb://127.0.0.1:27017/blog');



//mongoose.Promise = global.Promise;
// mongoose.connect(`mongodb://127.0.0.1:${dbConfig.port}/${dbConfig.database}`);
//mongoose.connect('mongodb://127.0.0.1:27017/blog');


// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);



const port = process.env.PORT || 3000;

const app = express();
const compiler = webpack(config);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(passport.initialize());


app.use(express.static('public'));



app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}));


// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});
