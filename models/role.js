const { Schema, model } = require('mongoose');

/**
 * Schema for the role model.
 */
const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'Role required']
  }
});

module.exports = model('Role', RoleSchema);
