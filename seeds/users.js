const uuidv4 = require('./uuid/v4');

exports.seed = function(knex) {
  return knex('user').del()
    .then(function () {
      return knex('user').insert({
        id: uuidv4(),
        display_name: 'Julius Reade',
        email: 'julius.reade@pokeml.com',
        avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        providers: 'google',
        admin: false,
      });
    });
};
