const knex = require('../db/knex');
// const passport = require('passport');

const saveAnnotation = async (_, { annotation }) => {
  try {
    const annotation = 
    await knex('annotation').insert(annotation);


    
  } catch (error) {
    throw new Error('saveAnnotation - le error - ' + error);
  }
};

module.exports = {
  saveAnnotation,
}