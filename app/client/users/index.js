import { Router } from 'express';
import { checkToken } from '../../middleware/controller.js';
import { validate } from '../../utils/validator.js';
import {
  signIn,
  signUp,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} from './controller.js';
import {
  checkSignIn,
  checkSignUp,
  updatePasswordReq
} from './validator.js';

const router = Router();

router.post('/signup', validate(checkSignUp), signUp);
router.post('/signin', validate(checkSignIn), signIn);
router.get('/user', getAllUsers);
router.get('/user/:userId', getUser);
router.put('/user/:userId', checkToken, validate(updatePasswordReq), updateUser);
router.delete('/user/:userId', deleteUser);

export default router;