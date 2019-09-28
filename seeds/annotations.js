// const uuidv4 = require('uuid/v4');

exports.seed = function(knex) {
  return knex('annotation').del()
    .then(function () {
      return knex('annotation').insert([
        // { 
        //   // coordinates: []
        //   width: 500,
        //   height: 931,
        //   // annotations: [],
        //   // annotationCategories: [],
        // },
      ]);
    });
};
