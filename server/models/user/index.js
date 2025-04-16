const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        // enum: ['user', 'admin'],
    },
    otp: { type: String },
    otpExpiry: { type: Date },
})

const User = mongoose.model('User', userSchema);
module.exports = User;