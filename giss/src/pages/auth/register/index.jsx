import { FaEnvelope, FaEye, FaFacebookF, FaGithub, FaGoogle, FaLinkedinIn, FaLock, FaUser } from 'react-icons/fa'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import '../autherization.css'
import toast from 'react-hot-toast';
import { registerUser } from '../../../store/auth-slice';

const initialStateRegister = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}
const AuthRegister = () => {
    const [formDataRegister, setFormDataRegister] = useState(initialStateRegister);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        if (formDataRegister.password !== formDataRegister.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        dispatch(registerUser(formDataRegister)).then((data) => {
            if (data?.payload?.success) {
                toast.success(data?.payload?.message)
                setFormDataRegister(initialStateRegister)
            } else {
                toast.error(data?.payload?.message)
            }
        })
    }

    const togglePasswordVisibility = (btnType) => {
        if(btnType === 'password'){
            setShowPassword(prevState => !prevState);
        }else{
            setShowConfirmPassword(prevState => !prevState);
        }
       
    };
    return (

        <div className='form-box register'>
            <form action="#" onSubmit={onSubmit}>
                <h1 style={{color:'#fff'}}>Registration</h1>
                <div className='input-box'>
                    <FaUser className='icon-left' />
                    <input type='text' placeholder='Name' value={formDataRegister.name} onChange={(e) => setFormDataRegister({
                        ...formDataRegister,
                        name: e.target.value
                    })} required />
                </div>
                <div className='input-box'>
                    <FaEnvelope className='icon-left' />
                    <input type='email' placeholder='Email' value={formDataRegister.email} onChange={(e) => setFormDataRegister({
                        ...formDataRegister,
                        email: e.target.value
                    })} required />
                </div>
                <div className='input-box'>
                    <FaLock className='icon-left' />
                    <input type={showPassword ? 'text' : 'password'} placeholder='Password' value={formDataRegister.password} onChange={(e) => setFormDataRegister({
                        ...formDataRegister,
                        password: e.target.value
                    })} required />
                    <FaEye className='icon-right' cursor='pointer' onClick={()=>togglePasswordVisibility('password')} />
                </div>
                <div className='input-box'>
                <FaLock className='icon-left' />
                    <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' value={formDataRegister.confirmPassword} onChange={(e) => setFormDataRegister({
                        ...formDataRegister,
                        confirmPassword: e.target.value
                    })} required />
                    <FaEye className='icon-right' cursor='pointer' onClick={()=>togglePasswordVisibility('confirm')} />
                </div>
                <button type='submit' className='btn'>Register</button>
                <p style={{color:'#fff'}}>or register with social media platforms</p>
                <div className='social-icons'>
                    <a href='#'><FaGoogle className='icon' /></a>
                    <a href='#'><FaFacebookF className='icon' /></a>
                    <a href='#'><FaGithub className='icon' /></a>
                    <a href='#'><FaLinkedinIn className='icon' /></a>
                </div>
            </form>
        </div>
    )
}

export default AuthRegister;