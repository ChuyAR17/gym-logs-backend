const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Validates the JWT token providen.
 * 
 * @param {Request} req - Request to be verified.
 * @param {Reponse} res - Response to be verified.
 * @param {Callback} next - Callback to vontinie with the normal flow.
 * @returns An error if the token is not valid or continues with the flow.
 */
const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) return res.status(401).json({ msg: 'Not token providen.' });

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(uid);

    // Verify if the user exists
    if (!user) return res.status(401).json({ msg: 'User not valid.' });

    // Verify if the user is active
    if (!user.state) return res.status(401).json({ msg: 'Token not valid.' });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: 'Token not valid.' });
  }
}

module.exports = { validateJWT };
