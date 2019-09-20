require('dotenv').config()

const { GraphQLServer } = require('graphql-yoga');

const { searchPokemon } = require('./queries/index');

const typeDefs = `
  type Query {
    searchPokemon(pokemonName: String): [Pokemon]
  }
  type Pokemon {
    id: String
    name: String
    sprite: String
  }
  type PokemonType {
    name: String
  }
`;

const resolvers = {
  Query: {
    searchPokemon,
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

const options = {
  port: 2002,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  cors: {
    credentials: true,
    preflightContinue: true,
    origin: ["https://pokeml.com", "http://localhost:3000", "http://localhost:4000"] // your frontend url.
  }
};

server.start(options, () => console.log('Server is running on localhost:2002'));
