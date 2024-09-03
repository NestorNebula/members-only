const express = require('express');
require('dotenv').config();
const path = require('node:path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db/pool');
const app = express();
const indexRouter = require('./routes/indexRouter');
const signupRouter = require('./routes/signupRouter');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new pgSession({
      pool: pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.session());

app.use('/', indexRouter);
app.use('/sign-up', signupRouter);

const PORT = process.env.PORT;
app.listen(PORT);
