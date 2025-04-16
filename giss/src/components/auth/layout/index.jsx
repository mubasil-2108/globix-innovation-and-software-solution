import { Outlet, useNavigate } from 'react-router-dom'
import '../../../pages/auth/autherization.css'
import { Box, useTheme } from '@mui/material';
import { useState } from 'react';

const AuthLayout = () => {
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const theme = useTheme();
    const handleForgotPasswordClick = () => {
        setIsForgotPassword(true);
    };
    const navigate = useNavigate();

    const handleBackToLoginClick = () => {
        if (isForgotPassword) {
            setIsForgotPassword(false);
        } else {
            document.querySelector('.container').classList.add('active');
            navigate('/auth/register')
        }
    }
    return (
        <div className='auth'>
            <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
                <div className='container'>
                    {/* <Outlet /> */}
                    <div className='toggle-box'>
                        <div className='toggle-panel toggle-left' >
                            <h1>{isForgotPassword ? 'Forgot Password' : 'Hello Welcome!'}</h1>
                            <p>{isForgotPassword ? 'Enter your email address' : 'Don\'t have an account?'}</p>
                            {
                                isForgotPassword ? null
                                    :
                                    <button onClick={handleBackToLoginClick} className='btn register-btn'>Register</button>
                            }
                        </div>

                        <div className='toggle-panel toggle-right'>
                            <h1>Welcome Back!</h1>
                            <p>Already have an account?</p>
                            <button onClick={() => {
                                document.querySelector('.container').classList.remove('active');
                                navigate('/auth/login')
                            }} className='btn login-btn'>Login</button>
                        </div>
                    </div>
                    <Outlet context={{ handleForgotPasswordClick, handleBackToLoginClick }} />
                </div>
            </Box>
        </div>
    )
}
export default AuthLayout;