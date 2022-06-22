const { request, response } = require('express');
const { validationResult } = require('express-validator');

/**
 * Validate the needed fields.
 * 
 * @param {Request} req - Request to be validated.
 * @param {Response} res - Response to be validated.
 * @param {Callback} next - Callback to keep the request to continue.
 * @returns The existent errors or continues the request.
 */
const validateFields = (req = request, res = response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({
    errors: errors.array().map(err => ({
      field: err.param,
      msg: err.msg
    }))
  });

  next();
}

module.exports = { validateFields };
