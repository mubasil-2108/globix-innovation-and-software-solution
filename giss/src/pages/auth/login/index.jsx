
import { FaEye, FaFacebookF, FaGithub, FaGoogle, FaLinkedinIn, FaLock, FaUser } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../store/auth-slice';
import '../autherization.css'
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Typography } from '@mui/material';
import { ForgetPassword } from '../../../components/auth';

const initialStateLogin = {
    email: "",
    password: "",
}
const AuthLogin = () => {
    const [formDataLogin, setFormDataLogin] = useState(initialStateLogin);
    const [showPassword, setShowPassword] = useState(false);
    const [showForgetPassword, setShowForgetPassword] = useState(false); // New state
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { handleForgotPasswordClick, handleBackToLoginClick } = useOutletContext();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formDataLogin)).then((data) => {
            if (data?.payload?.success) {
                toast.success(data?.payload?.message)
                setFormDataLogin(initialStateLogin)
            } else {
                toast.error(data?.payload?.message)
            }
        })
    }
    useEffect(() => {
        // Check the URL on initial load to decide which UI to show
        if (location.pathname.includes('/auth/forgetpassword')) {
            setShowForgetPassword(true);
        } else {
            setShowForgetPassword(false);
        }
    }, [location.pathname]);

    const handleForgotPassword = () => {
        setShowForgetPassword(true);
        window.history.pushState({}, '', '/auth/forgetpassword');
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };
    return (
        <div className='form-box login'>
            {!showForgetPassword && !location.pathname.includes('/auth/forgetpassword') ? (
            <form action="#">
                <h1 style={{color:'#fff'}}>Login</h1>
                <div className='input-box'>
                    <FaUser className='icon-left' />
                    <input type='email' placeholder='Email' value={formDataLogin.email} onChange={(e) => setFormDataLogin({
                        ...formDataLogin,
                        email: e.target.value
                    })} required />
                    {/* <i className='bx bxs-user'></i> */}

                </div>
                <div className='input-box'>
                    <FaLock className='icon-left' />
                    <input type={showPassword ? "text" : "password"} placeholder='Password' value={formDataLogin.password} onChange={(e) => setFormDataLogin({
                        ...formDataLogin,
                        password: e.target.value
                    })} required />
                    <FaEye className='icon-right' cursor='pointer' onClick={togglePasswordVisibility}/>
                </div>
                <div className='forget-link'>
                    <Typography variant='button' sx={{cursor:'pointer'}} color='#fff' onClick={() => {
                                handleForgotPassword();
                                handleForgotPasswordClick();
                            }}>Forgot Password?</Typography>
                </div>
                <button onClick={onSubmit} type='submit' className='btn'>Login</button>
                <p style={{color:'#fff'}}>or login with social media platforms</p>
                <div className='social-icons'>
                    <a href='#'><FaGoogle className='icon' /></a>
                    <a href='#'><FaFacebookF className='icon' /></a>
                    <a href='#'><FaGithub className='icon' /></a>
                    <a href='#'><FaLinkedinIn className='icon' /></a>
                </div>
            </form>
            ) : (
                <ForgetPassword onBackToLogin={() => {
                    setShowForgetPassword(false);
                    window.history.pushState({}, '', '/auth/login');
                    handleBackToLoginClick();
                }}/>
            )}
        </div>
    )
}

export default AuthLogin


