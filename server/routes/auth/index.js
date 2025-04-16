
const express = require('express');
const { registerUser, loginUser, authMiddleware, logoutUser, forgetPassword, sendOtp, verifyOtp } = require('../../controllers/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forget-password', forgetPassword);
router.post('/logout', logoutUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        user
    })
})

module.exports = router;