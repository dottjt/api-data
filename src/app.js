const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
  type Pokemon {

  }
  type Query {
    searchPokemon(pokemonName: String): [Pokemon]!
  }
`

const resolvers = {
  Query: {
    searchPokemon: (_, { pokemonName }) => {

    },
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => console.log('Server is running on localhost:4000'))
