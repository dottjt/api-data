require('dotenv').config()

const { GraphQLServer } = require('graphql-yoga');

const { 
  getPokemon,
  getImages,
} = require('./queries');

const { 
  saveAnnotation,
} = require('./mutations');

const typeDefs = require('./typeDefs');

const resolvers = {
  Query: {
    getPokemon,
    getImages,
  },
  Mutation: {
    saveAnnotation,
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

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
