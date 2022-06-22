const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verify the Google token to retrieve the user's info.
 * 
 * @param {String} token - Google token.
 * @returns Info from the google token payload.
 */
async function googleVerify(token = '') {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const { name, picture, email } = ticket.getPayload();

  return {
    name,
    email,
    img: picture
  }
}

module.exports = { googleVerify };
