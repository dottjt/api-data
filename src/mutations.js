const knex = require('./db/knex');
// const passport = require('passport');

const saveAnnotation = async (_, { annotation }) => {
  try {
    await knex('annotation').insert(annotation);

  // maybe I need to insert or make changes to an image.
    
  } catch (error) {
    throw new Error('saveAnnotation - le error - ' + error);
  }
};

module.exports = {
  saveAnnotation,
}