const { User, Role } = require('../models');

/**
 * Throws an error if the role provided is not a valid role.
 * @param {String} role - Role to check.
 */
const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) throw new Error('Role does not exists.');
};

/**
 * Checks if the email provided already exists.
 * @param {String} email - email to check.
 */
const emailExists = async (email) => {
  const emailExists = await User.findOne({ email });
  if (emailExists) throw new Error('This email already exists.');
};

/**
 * Checks if the user id already exists.
 * @param {String} id - user id to check.
 */
const userIdExists = async (id = '') => {
  const idExists = await User.findById(id);
  if (!idExists) throw new Error('User Id does not exists.');
}

/**
 * Checks if the collection providen exists.
 * @param {String} collection - collection to check.
 * @param {Array} collectionsList - List of permitter collections.
 */
const permittedCollections = (collection = '', collectionsList = []) => {
  const include = collectionsList.includes(collection);
  if (!include) throw new Error(`Collection ${collection} is not permitted.`);
}

module.exports = {
  isValidRole,
  emailExists,
  userIdExists,
  permittedCollections
};
