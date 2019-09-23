const passport = require('passport');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');

const jwtParser = jwt({
  credentialsRequired: false,
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  getToken: req => {
    if (req.cookies.token) return req.cookies.token
    return null
  },
})

// Make Apollo Server handle the unauthenticated users and not Express
function handleJwtError (err, req, res, next) {
  if (err.code === 'invalid_token') return next()
  return next(err)
}

function handlePassportError (err, req, res, next) {
  if (err) {
    let data = {}
    if (!(process.env.NODE_ENV === 'production')) {
      data.err = err
      res.status(500).send(errSchema(data, 500))
    }
  } else return next()
}

function errSchema (data, statusCode) {
  let res = {
    error: data,
    status: statusCode,
  }

  if (typeof data === 'string') res.error = { message: data }

  return res
}

module.exports = {
  passport,
  cookieParser,
  jwtParser,
  handleJwtError,
  handlePassportError,
};
