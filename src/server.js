require('dotenv').config()

const { GraphQLServer } = require('graphql-yoga');
const passport = require('passport');

const { getPokemon, getImages } = require('./queries');
const { saveAnnotation } = require('./mutations');
// const { loginUser, logoutUser, createUser, verifyUser, resetPasswordUser } = require('./authentication')

const typeDefs = require('./typeDefs');

const { membersOnly } = require('./passport');

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

// const context = ({ req }) => {
//   const { user } = req
//   if (!user || user.role !== 'MEMBER') {
//     throw new AuthenticationError('No Access!')
//   } else {
//     return {
//       user: req.user,
//     }
//   }
// }

const context = async ({ req }) => {
  let authToken = null;
  let currentUser = null;

    // try {
    //   authToken = req.headers[HEADER_NAME];

    //   if (authToken) {
    //     currentUser = await tradeTokenForUser(authToken);
    //   }
    // } catch (e) {
    //   console.warn(`Unable to authenticate using auth token: ${authToken}`);
    // }

  return {
    authToken,
    currentUser,
  };
}

const knex = require('../db/knex');
const server = new GraphQLServer({ typeDefs, resolvers, context });
// NOTE: See if there is a applyMiddleware argument. 
server.express.use(passport.initialize());
server.express.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
  try {
    const user = await knex('user').where('id', id).select();
    cb(null, user);  
  } catch(error) {
    cb(error, null);  
  }
});

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
