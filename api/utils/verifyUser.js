import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];

  if (!token) return next(errorHandler(401, 'Access denied. No token provided.'));

  try {
    const decoded = jwt.verify(token, 'abhishek'); // Use your secret key here
    req.user = await User.findById(decoded.id).select('-password');

    console.log('Decoded User:', req.user); // Debugging line

    next();
  } catch (error) {
    console.log('Token verification error:', error); // Debugging line
    next(errorHandler(400, 'Invalid token.'));
  }
};
