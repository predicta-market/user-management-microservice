import express from 'express';
import { register,signin } from '../controller';

const authRoute = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
authRoute.post('/register',register);

/**
 * @route   POST /api/auth/signin
 * @desc    Login an existing user
 * @access  Public
 */
authRoute.post('/signin', signin);

export default authRoute;