'use strict';

const passport = require('passport');
const passportLocal = require('passport-local');

const bcryptjs = require('bcryptjs');
const User = require('./models/user');

// Passport Strategy configuration
passport.use(
  'sign-up',
  new passportLocal.Strategy(
    { passReqToCallback: true },
    (req, username, password, callback) => {
      console.log(req.body);
      const role = req.body.role;
      bcryptjs
        .hash(password, 10)
        .then(hash => {
          return User.create({
            username,
            role,
            passwordHash: hash
          });
        })
        .then(user => {
          callback(null, user);
        })
        .catch(error => {
          console.log(error);
          callback(error);
        });
    }
  )
);

passport.use(
  'sign-in',
  new passportLocal.Strategy({}, (username, password, callback) => {
    let user;
    User.findOne({ username })
      .then(document => {
        if (!document) {
          return Promise.reject(
            new Error("There's no user with that username.")
          );
        } else {
          user = document;
          return bcryptjs.compare(password, user.passwordHash);
        }
      })
      .then(result => {
        if (result) {
          callback(null, user);
        } else {
          return Promise.reject(new Error('Wrong password.'));
        }
      })
      .catch(error => {
        console.log(error);
        callback(error);
      });
  })
);

// Passport Serialize and Deserialize
passport.serializeUser((user, callback) => {
  callback(null, user._id);
});
passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => callback(null, user))
    .catch(err => callback(err));
});
