
const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
const resend = require('resend')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const mongoose = require('mongoose');

// Resgister
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.json({
                success: false,
                message: 'User already exists with this email! Please try another email',
            })
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
        })

        await newUser.save();
        
        const indexes = await mongoose.connection.db.collection('users').indexes();
        const userNameIndex = indexes.find(index => index.name === 'userName_1');
        if (userNameIndex) {
            await mongoose.connection.db.collection('users').dropIndex('userName_1');
        }
        res.status(200).json({
            success: true,
            message: 'User created successfully',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

// Login

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.json({
                success: false,
                message: 'User not found with this email! Please register first',
            })
        }
        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) {
            return res.json({
                success: false,
                message: 'Invalid password',
            })
        }
        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            name: checkUser.name,
        }, 'CLIENT_SECRET_KEY', { expiresIn: '60m' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: true
        }).json({
            success: true,
            message: 'User logged in successfully',
            token: token,
            user: {
                id: checkUser._id,
                name: checkUser.name,
                email: checkUser.email,
                role: checkUser.role,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

const forgetPassword = async (req, res) => {
    const { email, password } = req.body;
    try {

        const hashPassword = await bcrypt.hash(password, 12);

        const updatePassword = await User.findOneAndUpdate(
            { email },
            { password: hashPassword },
            { new: true }
        );
        if (!updatePassword) {
            return res.json({
                success: false,
                message: 'User not found with this email! Please register first',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

// send OTP

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const emailResend = new resend.Resend('re_Sp6wveUc_E2FQkcY2epbBrBeCgatUoouR')

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     // service: 'gmail',
//     port: 587,
//     auth: {
//         user: 'abel43@ethereal.email',
//         pass: 'wkrmAB3GhCBCYJZX2a',
//     }
// })

const sendOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.json({
                success: false,
                message: 'User not found with this email! Please register first',
            })
        }
        const otp = generateOTP();
        const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

        await checkUser.updateOne({ otp, otpExpiry });
       await emailResend.emails.send({
            from: 'Globalix Innovations & Software Solutions <onboarding@resend.dev>',
            to: email,
            subject: 'OTP for verification',
            html: `<p>Your OTP is <b>${otp}</b>
            It is valid for 10 minutes.</p>`,
        })

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully to your email',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

// verify OTP

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.json({
                success: false,
                message: 'User not found with this email! Please register first',
            })
        }

        if (!checkUser || checkUser.otp !== otp || checkUser.otpExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP',
            })
        }

        await checkUser.updateOne({ otp: null, otpExpiry: null });

        res.status(200).json({
            success: true,
            message: 'OTP verified successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

// Logout User 

const logoutUser = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "User logged out successfully",
    })
}

// auth Middleware

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised user!",
        })
    }

    try {
        const decoded = jwt.decode(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Unauthorised user!",
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgetPassword,
    sendOtp,
    verifyOtp,
    authMiddleware
}