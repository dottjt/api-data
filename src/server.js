require('dotenv').config()

const { GraphQLServer } = require('graphql-yoga');
// const passport = require('passport');
// const OAuth2Strategy = require('passport-oauth2');
// const LocalStrategy = require('passport-local');

// Authentication
// passport.use(new LocalStrategy(
//   async function(username, password, done) {
//     const user = await knex('user')

//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

// passport.use(new OAuth2Strategy({
//   authorizationURL: 'https://www.example.com/oauth2/authorize',
//   tokenURL: 'https://www.example.com/oauth2/token',
//   clientID: EXAMPLE_CLIENT_ID,
//   clientSecret: EXAMPLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:3000/auth/example/callback"
// },
// function(accessToken, refreshToken, profile, cb) {
//   const doesUserExist = knex('user')
//   await knex('user')

//   User.findOrCreate({ exampleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));

const { 
  getPokemon,
  getImages,
} = require('./queries');

const { 
  saveAnnotation,
} = require('./mutations');

// const {
//   loginUser,
//   logoutUser,
//   createUser,
//   verifyUser,
//   resetPasswordUser,
// } = require('./authentication')

const typeDefs = require('./typeDefs');

const resolvers = {
  Query: {
    getPokemon,
    getImages,
  },
  Mutation: {
    saveAnnotation,

    // loginUser,
    // logoutUser,
    // createUser,
    // verifyUser,
    // resetPasswordUser,
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

// server.express.use();

const options = {
  port: 5001,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  cors: {
    credentials: true,
    preflightContinue: true,
    origin: ["https://pokeml.com", "https://api.pokeml.com", "http://localhost:3000", "http://localhost:4000"] // your frontend url.
  }
};

server.start(options, () => console.log('Server is running on localhost:5001'));
