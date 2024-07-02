// import User from "../models/user.model.js";
// import bcryptjs from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import { errorHandler } from "../utils/error.js";




// export const signup= async(req,res,next)=>
// {
 
// const {username, email, password}=req.body;
// const hashpass=bcryptjs.hashSync(password,10);
// const newUser=new User({username,email,password:hashpass})
// try{
//     await newUser.save()
// res.status(201).send(newUser)

// }
// catch(error){
//     next(error);

// }
// }

// export const signin=async(req,res,next)=>
// {
//     const {email,password}=req.body;
//     try{

//         const validUser=await User.findOne({email});
//         if (!validUser) return next(errorHandler(404, 'User not found!'));

//         const validPassword=bcryptjs.compareSync(password,validUser.password)
//         if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
//         const token=jwt.sign({id:validUser._id},"abhishek")
//         const {password:pass,...rest}=validUser._doc
//             res.cookie('access_token',token,{httpOnly:true})
//             .status(200)
//             .json(rest);
//     }
//     catch(error){
//         next(error);
//     }
     
// }







//   export const signOut=async (req,res,next)=>{
//     try{
//       res.clearCookie('access_token')
//       res.status(200).json('User has been logged out')
//     }
//     catch(error)
//     {
//       next(error)
//     }

//   }


// auth.controllers.js

// import bcryptjs from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from "../models/user.model.js";
// import { errorHandler } from "../utils/error.js";



export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashpass = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashpass });

  try {
    await newUser.save();
    res.status(201).json({
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      }
    });
  } catch (error) {
    next(error);
  }
};


// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) return next(errorHandler(404, 'User not found!'));
//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
//     const token = jwt.sign({ id: validUser._id }, "abhishek");
//     const { password: pass, ...rest } = validUser._doc;
//     res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };
// user.controller.js
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, 'User not found'));

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) return next(errorHandler(400, 'Invalid credentials'));

    const token = jwt.sign({ id: user._id }, 'abhishek', { expiresIn: '1h' });

    const { password: pass, ...userWithoutPassword } = user._doc;
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    next(error);
  }
};


export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out');
  } catch (error) {
    next(error);
  }
};
