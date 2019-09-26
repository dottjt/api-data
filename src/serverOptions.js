// const { AuthenticationError } = require('apollo-server-express');
const { 
  getCurrentUser,
  getPokemon, 
  getImages,
  getNewImage,
} = require('./graphql/queries');
const { saveAnnotation } = require('./graphql/mutations');
// const { loginUser, logoutUser, createUser, verifyUser, resetPasswordUser } = require('./authentication')

const typeDefs = require('./graphql/typeDefs');

const resolvers = {
  Query: {
    getCurrentUser,
    getPokemon,

    getImages,
    getNewImage,
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

// const context = async (req) => {
//   console.log(req);
//   const { user } = req;
//   if (!user || user.role !== 'MEMBER') {
//     throw new AuthenticationError('No Access!')
//   } else {
//     return {
//       user: req.user,
//     }
//   }
// }

module.exports = {
  typeDefs,
  resolvers,
  // context,
};
