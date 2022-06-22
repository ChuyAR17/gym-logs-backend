const validateFields = require('./validate-fields');
const validateJWT = require('./validate-jwt');
const validateFile = require('./validate-file');
const validateRoles = require('./validate-roles');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateFile,
  ...validateRoles
};
