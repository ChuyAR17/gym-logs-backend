const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares');

const router = Router();

router.post('/login', [
  check('email', 'Email required').isEmail(),
  check('password', 'Password required').notEmpty(),
  validateFields
], login);

router.post('/googleSign', [
  check('id_token', 'Google token required').notEmpty(),
  validateFields
], googleSignIn);

module.exports = router;
