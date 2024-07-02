import express from 'express'
import { signup , signOut, signIn} from '../controllers/auth.controller.js';

const router =express.Router();

router.post('/signup',signup)
router.post('/signin',signIn)
router.get('/signout',signOut)

export default router;