const uuidv4 = require('uuid/v4');

exports.seed = function(knex) {
  return knex('image').del()
    .then(function () {
      return knex('image').insert([
        { 
          id: uuidv4(),
          url: 'http://localhost:4000/images/pokemon_image_1.png',
          type: 'na',
          width: 500,
          height: 931,
          // annotations: [],
          // annotationCategories: [],
        },
        { 
          id: uuidv4(),
          url: 'http://localhost:4000/images/pokemon_image_2.png',
          type: 'na',
          width: 430,
          height: 221,
          // annotations: [],
          // annotationCategories: [],
        },
        { 
          id: uuidv4(),
          url: 'http://localhost:4000/images/pokemon_image_3.jpeg',
          type: 'na',
          width: 1200,
          height: 800,
          // annotations: [],
          // annotationCategories: [],
        },
      ]);
    });
};
