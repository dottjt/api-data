const knex = './db/knex';
const passport = require('passport');

// const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;

function setupGoogleStrategy() {
  const provider = 'google';
  const passportConfig = {
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
  }

  passport.use(
    new GoogleStrategy(passportConfig, async function (accessToken, refreshToken, profile, done) {
      try {
        const { id } = profile;
        const email = profile.emails[0].value;

        const user = await knex('user').where('email', email).select('id');

        if (user) {
          done(null, user);
        } else {
          const user = await knex('user').insert({ id, email, provider, profile });
          done(null, user);
        }
      } catch (error) {
        done(error)
      }
    })
  )
}

function setupDiscordStrategy() {
  const passportConfig = {
    callbackURL: '/auth/discord/redirect',
    clientID: process.env.DISCORD_CLIENTID,
    clientSecret: process.env.DISCORD_CLIENTSECRET,
  }

  const provider = 'discord';

  passport.use(
    new DiscordStrategy(passportConfig, async function (accessToken, refreshToken, profile, done) {
      try {
        const { email, id } = profile;

        const user = await knex('user').where('email', email).select('id');

        if (user) {
          done(null, user);
        } else {
          const user = await knex('user').insert({ id, email, provider, profile });
          done(null, user);
        }
      } catch (error) {
        done(error)
      }
    })
  )
}

// function serializePassport() {
//   passport.serializeUser(function(user, cb) {
//     cb(null, user.id);
//   });

//   passport.deserializeUser(async function(id, cb) {
//     try {
//       const user = await knex('user').where('id', id).select();
//       cb(null, user);
//     } catch(error) {
//       cb(error, null);
//     }
//   });
// }

module.export = {
  setupGoogleStrategy,
  setupDiscordStrategy,
};


// // https://reallifeprogramming.com/authentication-and-authorization-in-nodejs-graphql-api-58528f6fce5f

// const requiresRole = role => resolver => {
//   return (parent, args, context, info) => {
//     if (context.user && (!role || context.user.role === role)) {
//       return resolver(parent, args, context, info)
//     } else {
//       throw new AuthenticationError('Unauthorized')
//     }
//   }
// }
// const membersOnly = requiresRole('MEMBER')
// const adminsOnly = requiresRole('ADMIN')
// const requiresLogin = requiresRole(null)

// module.export = {
//   membersOnly,
//   adminsOnly,
//   requiresLogin,
// }

// function setupLocalStrategy() {
//   passport.use(new LocalStrategy(
//     async function(username, password, done) {

//       const user = await knex('user').where('email', email).select('id');

//       if (user) {
//         done(null, user);
//       } else {
//         const user = await knex('user').insert({ id, email, provider, profile });
//         done(null, user);
//       }
//     }
//   ));
// }
