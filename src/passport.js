const { AuthenticationError } = require('apollo-server-express');
const OAuth2Strategy = require('passport-oauth2');
const LocalStrategy = require('passport-local');

const passportSetup = (passport) => {
  passport.use(new LocalStrategy(
    async function(username, password, done) {
      const user = await knex('user').where('')

      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  passport.use(new OAuth2Strategy({
    authorizationURL: 'https://www.example.com/oauth2/authorize',
    tokenURL: 'https://www.example.com/oauth2/token',
    clientID: EXAMPLE_CLIENT_ID,
    clientSecret: EXAMPLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/example/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    const doesUserExist = knex('user')
    await knex('user')

    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
  ));
}


// https://reallifeprogramming.com/authentication-and-authorization-in-nodejs-graphql-api-58528f6fce5f

const requiresRole = role => resolver => {
  return (parent, args, context, info) => {
    if (context.user && (!role || context.user.role === role)) {
      return resolver(parent, args, context, info)
    } else {
      throw new AuthenticationError('Unauthorized')
    }
  }
}
const membersOnly = requiresRole('MEMBER')
const adminsOnly = requiresRole('ADMIN')
const requiresLogin = requiresRole(null)

module.export = {
  membersOnly,
  adminsOnly,
  requiresLogin,
}



