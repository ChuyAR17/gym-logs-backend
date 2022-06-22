const { response, request } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

/**
 * Lists the users from the database.
 * 
 * @param {Request} req
 * @param {Response} res
 */
const getUsers = async (req = request, res = response) => {
  const { limit = 10, offset = 0 } = req.query;
  const query = { state: true };

  const [count, data] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(offset).limit(limit)
  ]);

  res.json({ count, data });
}

/**
 * Creates a new user in the database.
 * 
 * @param {Request} req
 * @param {Response} res
 */
const createUser = async (req = request, res = response) => {
  const { name, lastname, email, password, role } = req.body;
  const user = new User({ name, lastname, email, password, role });

  // Encrypt the password
  const salt = await bcrypt.genSalt();
  user.password = bcrypt.hashSync(password, salt);

  // Save the user's info
  try {
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: 'Error on saving the user.',
      error: error
    });
  }
}

/**
 * Updates an user.
 * 
 * @param {Request} req
 * @param {Response} res
 */
const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, google, email, ...rest } = req.body;

  if (password) {
    // Envrypt the password
    const salt = await bcrypt.genSalt();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const userDb = await User.findOneAndUpdate(id, rest, { new: true });

  return res.json({ ...userDb.toJSON() });
}

/**
 * Set the state to false from the user.
 * 
 * @param {Request} req
 * @param {Response} res
 */
const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { state: false }, { new: true });

  // Get the user from the request
  const userAuthenticated = req.user;

  return res.json({
    user,
    userAuthenticated
  });
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
