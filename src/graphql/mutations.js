const knex = require('../db/knex');
// const passport = require('passport');

const saveAnnotation = async (_, { annotationInput }) => {
  try {
    const annotation = await knex('annotation').insert(annotation).returning('*');

    return annotation;
  } catch (error) {
    throw new Error('saveAnnotation - le error - ' + error);
  }
};

module.exports = {
  saveAnnotation,
}