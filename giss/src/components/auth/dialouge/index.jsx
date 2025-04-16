import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Dialog, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { forgetPassword, verifyOtp } from '../../../store/auth-slice';
import toast from 'react-hot-toast';

const ForgetDialouge = ({ handleClose, email, open, setFormForgetPassword, initialState }) => {
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const dispatch = useDispatch();

    useEffect(() => {
        const originalPath = window.location.pathname;

        if (open) {
            // Push new URL without reloading the page
            window.history.pushState({}, '', '/auth/forgetpassword/otp');
        } else {
            // Restore the original path
            window.history.pushState({}, '', originalPath);
        }

        // Optional: Cleanup when component unmounts or dialog closes
        return () => {
            if (open) {
                window.history.pushState({}, '', originalPath);
            }
        };
    }, [open]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) return; // only allow digits

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Focus next field if the current field is filled
        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Gather OTP as a string (ignoring empty values)
    const finalOtp = otp.join('');

    const handleSubmit = async () => {
        if (finalOtp.length === 6) {
            await dispatch(verifyOtp({ email, otp: finalOtp })).then( async (data) => {
                if (data?.payload?.success) {
                    toast.success(data?.payload?.message);
                    await dispatch(forgetPassword({ email, otp: finalOtp })).then((data) =>{
                        if (data?.payload?.success) {
                            toast.success(data?.payload?.message);
                            handleClose(); // Close the dialog on success
                            setOtp(Array(6).fill('')); // Reset OTP state
                            setFormForgetPassword(initialState); // Reset form state
                        }else{
                            toast.error(data?.payload?.message);
                        }
                    }) // Call your forgetPassword action with the email and OTP
                    handleClose(); // Close the dialog on success

                }else {
                    toast.error(data?.payload?.message);
                }
            }) // Call your verifyOtp action with the OTP
        } else {
            console.log('OTP is incomplete');
        }
    };
    return (
        <Dialog onClose={handleClose} open={open} fullWidth >
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }}>
                <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Check Your Email</Typography>
                <Box sx={{ columnGap: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <TextField
                            key={index}
                            inputRef={(el) => (inputRefs.current[index] = el)}
                            variant='standard'
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            inputProps={{
                                maxLength: 1,
                                style: { textAlign: 'center', fontSize: '20px', fontWeight: 'bold' },
                            }}
                            sx={{ width: '5%' }}
                        />
                    ))}
                </Box>
                <Button variant="outlined" onClick={handleSubmit} sx={{ width: '50%', mb: '10px' }}>Verify OTP</Button>
            </Box>
        </Dialog>
    )
}

export default ForgetDialouge