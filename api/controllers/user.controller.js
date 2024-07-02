// user.controllers.js

import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from  '../models/user.model.js';

// export const updateUser = async (req, res, next) => {
//   if (req.user.id !== req.params.id) {
//     return next(errorHandler(401, 'You can only update your own account!'));
//   }
//   try {
//     if (req.body.password) {
//       req.body.password = bcryptjs.hashSync(req.body.password, 10);
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           username: req.body.username,
//           email: req.body.email,
//           password: req.body.password,
//           avatar: req.body.avatar,
//         },
//       },
//       { new: true }
//     );

//     const { password, ...rest } = updatedUser._doc;

//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { username, email, password, avatar } = req.body;

    // Validate data
    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required fields' });
    }
    // Additional data validation (e.g., email format, password complexity)

    // Hash password if provided
    if (password) {
      req.body.password = bcryptjs.hashSync(password, 10);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { username, email, password: req.body.password, avatar } },
      { new: true }
    );

    // Check if user exists
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Exclude password from response
    const { password: _, ...userData } = updatedUser._doc;

    res.status(200).json(userData);
  } catch (error) {
    // Handle errors
    console.error('Error updating user:', error);
    next(error);
  }
};




// export const getUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
  
//     if (!user) return next(errorHandler(404, 'User not found!'));
  
//     const { password: pass, ...rest } = user._doc;
  
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optionally, perform additional clean-up tasks (e.g., delete related data)

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing' });
    }
    
    const user = await User.findById(userId);
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};



  export const getAllUsers = async (req, res, next) => {
    try {
      // Fetch all users from the database
      const users = await User.find({}, '-password'); // Exclude the password field
  
      // Check if any users were found
      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }
  
      // Return the list of users
      res.status(200).json(users);
    } catch (error) {
      // Handle errors
      next(error);
    }
  };




//user book operations

export const createReadingList = async (req, res) => {
  const { userId } = req.params;
  const { bookIds } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    user.readingList = bookIds;
    await user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addBookToReadingList = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    if (!user.readingList.includes(bookId)) {
      user.readingList.push(bookId);
      await user.save();
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const removeBookFromReadingList = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Filter out null or undefined values before removing the book
    user.readingList = user.readingList.filter(id => id && id.toString() !== bookId);
    await user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const getReadingList = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId).populate('readingList');
      if (!user) return res.status(404).send('User not found');
  
      res.status(200).send(user.readingList);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };