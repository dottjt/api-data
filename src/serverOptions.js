require('dotenv').config()

const { AuthenticationError } = require('apollo-server-express')
const { getPokemon, getImages } = require('./queries');
const { saveAnnotation } = require('./mutations');
// const { loginUser, logoutUser, createUser, verifyUser, resetPasswordUser } = require('./authentication')

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

const context = async ({ req }) => {
  const { user } = req
  if (!user || user.role !== 'MEMBER') {
    throw new AuthenticationError('No Access!')
  } else {
    return {
      user: req.user,
    }
  }
}

module.exports = {
  typeDefs,
  resolvers,
  context,
}