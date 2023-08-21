import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public 
export const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (user && (await user.matchPasswords(password))){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }else{
        res.status(401);
        throw new Error('Invalid user or password');
    }
});

// @desc Register a new user
// route POST /api/users
// @access Public 
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email});

    if (userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Logout user 
// route POST /api/users/logout
// @access Public 
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "User Logged out" });
});

// @desc Get user profile
// route Get /api/users/profile
// @access Private 
export const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User profile" });
});

// @desc Update user profile
// route PUT /api/users/profile
// @access Private 
export const updateUseProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Update User profile" });
});