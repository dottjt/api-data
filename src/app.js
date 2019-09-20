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

server.start(() => console.log('Server is running on localhost:4000'));
