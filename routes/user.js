const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT, isAdminRole } = require('../middlewares');
const { isValidRole, emailExists, userIdExists, } = require('../helpers');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user');

const router = Router();

router.get('/', validateJWT, getUsers);

router.post('/', [
  check('name', 'Name required.').isLength({ min: 2, max: 30 }),
  check('lastname', 'Lastname required.').isLength({ min: 2, max: 30 }),
  check('password', 'Password required, min length 6 characters.').isLength({ min: 6 }),
  check('email', 'Email not valid.').isEmail(),
  check('email', 'Email already exists.').custom(emailExists),
  check('role').custom(isValidRole),
  validateFields
], createUser);

router.put('/:id', [
  validateJWT,
  check('id', 'Not a valid ID.').isMongoId(),
  check('id').custom(userIdExists),
  check('role', 'Role is required').notEmpty(),
  check('role').custom(isValidRole),
  validateFields
], updateUser);

router.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'Not a valid ID.').isMongoId(),
  check('id').custom(userIdExists),
  validateFields
], deleteUser);

module.exports = router;
