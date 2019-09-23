const { Router } = require('express');
const passport = require('passport');
const { handlePassportError } = require('../middleware');

const router = Router();

// GOOGLE
router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  })
)

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    failureRedirect: process.env.CLIENT_LOGIN,
    session: false,
  }),
  handlePassportError,
  (req, res) => {
    // todo redirect users to client accordingly
    if (!req.user) res.status(404).send(errSchema('User not found', 404))
    res.cookie('token', req.user.token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    res.send(resSchema(req.user, res.statusCode))
  }
)

// DISCORD
router.get(
  '/discord',
  passport.authenticate('discord', {
    session: false,
    scope: ['email', 'identify'],
  })
)

router.get(
  '/discord/redirect',
  passport.authenticate('discord', {
    failureRedirect: process.env.CLIENT_LOGIN,
    session: false,
  }),
  handlePassportError,
  (req, res) => {
    // todo redirect users to client accordingly
    if (!req.user) res.status(404).send(errSchema('User not found', 404))
    res.cookie('token', req.user.token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    res.send(resSchema(req.user, res.statusCode))
  }
)

module.exports = router;

function resSchema(data, statusCode) {
  return {
    results: data,
    status: statusCode,
  }
}

function errSchema(data, statusCode) {
  let res = {
    error: data,
    status: statusCode,
  }

  if (typeof data === 'string') res.error = { message: data }

  return res
}

