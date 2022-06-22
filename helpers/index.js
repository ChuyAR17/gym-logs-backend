const googleVerify = require('./google-verify');
const generateJWT = require('./gen-jwt');
const dbValidations = require('./db-validations');

module.exports = {
  ...googleVerify,
  ...generateJWT,
  ...dbValidations
};
