const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

function secure(func, admin = false, moderator = false) {
  return (root, args, context) => {
    if (!context.user) throw new AuthenticationError('Unauthenticated')
    // admin only
    if (admin && !moderator && !context.user.admin) {
      throw new ForbiddenError('Unauthorized')
    // admin or moderator only
    } else if (
      admin &&
      moderator &&
      (!context.user.admin && !context.user.moderator)) {
      throw new ForbiddenError('Unauthorized')
    }
    return func(root, args, context)
  }
}

function secureUserOnly(func, userId = 'userId') {
  return (root, args, context) => {
    if (!context.user) throw new AuthenticationError('Unauthenticated')
    else if (
      !context.user.admin &&
      !context.user.moderator &&
      args[userId] !== context.user.id
    ) {
      throw new ForbiddenError('Unauthorized')
    }
    return func(root, args, context)
  }
}

module.exports = {
  secure,
  secureUserOnly,
}
