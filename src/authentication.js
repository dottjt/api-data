const knex = require('./db/knex');
// const passport = require('passport');
// const nodemailer = require("nodemailer");

// LOGIN / LOGOUT
const loginUser = async (_, { user }) => {
  try {

    await knex('user').insert(user);
    
  } catch (error) {
    throw new Error('loginUser - le error - ' + error);
  }
};

const logoutUser = async (_, { user }) => {
  try {
    await knex('user').insert(user);
    
  } catch (error) {
    throw new Error('logoutUser - le error - ' + error);
  }
};


// SEND EMAILS
const createUser = async (_, { annotation }) => {
  try {
    await knex('annotation').insert(annotation);
    
  } catch (error) {
    throw new Error('createUser - le error - ' + error);
  }
};

const verifyUser = async (_, { annotation }) => {
  try {
    await knex('annotation').insert(annotation);
    
  } catch (error) {
    throw new Error('verifyUser - le error - ' + error);
  }
};

const resetPasswordUser = async (_, { annotation }) => {
  try {
    await knex('annotation').insert(annotation);
    
  } catch (error) {
    throw new Error('verifyUser - le error - ' + error);
  }
};

module.exports = {
  loginUser,
  logoutUser,
  createUser,
  verifyUser,
  resetPasswordUser,
}