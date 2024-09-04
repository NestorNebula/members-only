const express = require('express');
require('dotenv').config();
const path = require('node:path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pgSession = require('connect-pg-simple')(session);
const bcrypt = require('bcrypt');
const pool = require('./db/pool');
const db = require('./db/queries');
const app = express();
const indexRouter = require('./routes/indexRouter');
const signupRouter = require('./routes/signupRouter');
const loginRouter = require('./routes/loginRouter');
const customError = require('./modules/error');

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
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      try {
        const user = await db.getUser(username);
        if (!user) {
          return done(null, false, { message: 'Incorrect email' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    done(null, user);
  } catch (err) {
    return done(err);
  }
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/sign-up', signupRouter);
app.use('/log-in', loginRouter);
app.use((req, res, next) => {
  next(new customError("This page doesn't exist.", 404, 'Page not found'));
});

app.use((err, req, res, next) => {
  err instanceof customError
    ? res.render('error', { error: err })
    : res.status(500).send('Unknown Error');
});

const PORT = process.env.PORT;
app.listen(PORT);
