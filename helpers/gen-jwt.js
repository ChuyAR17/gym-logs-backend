const jwt = require('jsonwebtoken');

/**
 * Generates the JWT token.
 * 
 * @param {String} uid - uid of the user
 * @returns The error of the token if genereted.
 */
const genJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('Token not created.');
      } else {
        resolve(token);
      }
    });
  });
}

module.exports = { genJWT };
