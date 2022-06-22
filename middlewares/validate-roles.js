const { request, response } = require('express');

/**
 * Check if the user's role is an admin.
 * 
 * @param {Request} req - Request to check.
 * @param {Response} res - Response to be retrieved.
 * @param {Callback} next - Callback to continue the flow.
 * @returns An error if the user is not a admin.
 */
const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) return res.status(500).json({ msg: 'Role validation not working' });

  if (req.user.role !== 'ADMIN') return res.status(401).json({ msg: 'User not an admin' });

  next();
}

/**
 * Check if the user has the providen role.
 * 
 * @param  {...any} roles - list of roles to check.
 * @returns An error if the roles providen are not permitted.
 */
const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(500).json({ msg: 'Role validation not working' });

    if (!roles.includes(req.user.role)) return res.status(401).json({ msg: 'User not authorized' });

    next();
  }
}

module.exports = { isAdminRole, hasRole };
