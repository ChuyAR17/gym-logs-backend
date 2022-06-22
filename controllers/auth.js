const { response, request } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { genJWT, googleVerify } = require('../helpers');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify email exists
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: 'User/Password are not correct.' });

    // Verify if user is active
    if (!user.state) return res.status(400).json({ msg: 'User is not active.' });

    // Verify password
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) return res.status(400).json({ msg: 'Incorrect password.' });

    // Generate JWT
    const token = await genJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Something went wrong.' });
  }
}

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, img } = await googleVerify(id_token);
    let user = await User.findOne({ email });

    if (!user) {
      // Create the user
      const data = {
        name,
        email,
        img,
        password: 'not-a-password',
        google: true
      };
      user = new User(data);
      await user.save();
    }

    // User is deactivated in DB?
    if (!user.state) return res.status(400).json({ msg: 'User not authorized.' });

    // Generate JWT
    const token = await genJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Google token not verified.');
  }
}

module.exports = {
  login,
  googleSignIn
};
