const knex = require('../db/knex');

const saveAnnotation = async (_, { inputAnnotations }) => {
  try {
    console.log('start saveAnnotation');
    for (let anno of inputAnnotations) {
      const annotation = await knex('annotation').insert(anno).returning('*');
      console.log(annotation);
    }
  } catch (error) {
    throw new Error('saveAnnotation - le error - ' + error);
  }
};

module.exports = {
  saveAnnotation,
}