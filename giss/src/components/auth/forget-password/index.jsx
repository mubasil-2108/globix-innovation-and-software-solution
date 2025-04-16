import React, { useState } from 'react'
import '../../../pages/auth/autherization.css'
import { FaEnvelope, FaEye, FaLock } from 'react-icons/fa'
import { Typography } from '@mui/material'
import toast from 'react-hot-toast'
import ForgetDialouge from '../dialouge'
import { useDispatch } from 'react-redux'
import { sendOtp } from '../../../store/auth-slice'

const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
}

const ForgetPassword = ({ onBackToLogin }) => {
    const [formForgetPassword, setFormForgetPassword] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [dialougeOpen, setDialougeOpen] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();

    const togglePasswordVisibility = (btnType) => {
        console.log(btnType, 'btnType');
        if(btnType === 'password'){
            setShowPassword(prevState => !prevState);
        }else{
            setShowConfirmPassword(prevState => !prevState);
        }
       
    };

    const handleClose = () => {
        setDialougeOpen(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (formForgetPassword.password !== formForgetPassword.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setDialougeOpen(true);
        await dispatch(sendOtp(formForgetPassword.email)).then((data) => {
            if (data?.payload?.success) {
                toast.success("OTP sent successfully");
                setDialougeOpen(true);
            }else{
                toast.error(data?.payload?.error);
            }
        })
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <form action="#" onSubmit={onSubmit}>
                <h1 style={{color:'#fff'}}>Forget Password</h1>
                <div className='input-box '>
                    <FaEnvelope className='icon-left' />
                    <input type='email' placeholder='Email' value={formForgetPassword.email} onChange={(e) => setFormForgetPassword({
                        ...formForgetPassword,
                        email: e.target.value
                    })} required />
                </div>
                <div className='input-box'>
                    <FaLock className='icon-left' />
                    <input type={showPassword ? 'text' : 'password'} placeholder='Password' value={formForgetPassword.password} onChange={(e) => setFormForgetPassword({
                        ...formForgetPassword,
                        password: e.target.value
                    })} required />
                    <FaEye className='icon-right' cursor='pointer' onClick={() => togglePasswordVisibility('password')} />
                </div>
                <div className='input-box'>
                    <FaLock className='icon-left' />
                    <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' value={formForgetPassword.confirmPassword} onChange={(e) => setFormForgetPassword({
                        ...formForgetPassword,
                        confirmPassword: e.target.value
                    })} required />
                    <FaEye className='icon-right' cursor='pointer' onClick={() => togglePasswordVisibility('confirm')} />
                </div>
                <button type='submit' className='btn'>Forget Password</button>
            </form>
            <Typography onClick={onBackToLogin} sx={{color: '#fff', ":hover": {color: 'blue'}}} style={{cursor: 'pointer', textAlign: 'center', marginTop: '10px'}}>Back to Login</Typography>
            <ForgetDialouge handleClose={handleClose} initialState={initialState} setFormForgetPassword={setFormForgetPassword} email={formForgetPassword.email} open={dialougeOpen}/>
        </div>
    )
}

export default ForgetPassword