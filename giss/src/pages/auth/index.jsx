import AuthLogin from "./login";
import AuthRegister from "./register";

export {
  AuthLogin,
  AuthRegister,
}








// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import './autherization.css'
// import { FaEnvelope, FaFacebookF, FaGithub, FaGoogle, FaLinkedinIn, FaLock, FaUser } from 'react-icons/fa'
// import { registerUser } from '../../store/auth-slice'
// import toast, { Toaster } from 'react-hot-toast';

// const initialStateLogin = {
//   userName: "",
//   password: "",
// }
// const initialStateRegister = {
//   userName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// }

// const Autherization = () => {
//   const [formDataLogin, setFormDataLogin] = useState(initialStateLogin);
//   const [formDataRegister, setFormDataRegister] = useState(initialStateRegister);
//   const dispatch = useDispatch();

//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (formDataRegister.password !== formDataRegister.confirmPassword) {
//       toast.error("Password does not match!")
//       return;
//     }

//     dispatch(registerUser(formDataRegister)).then((data) => {
//       if (data?.payload?.success) {
//         toast.success(data?.payload?.message)
//         console.log(formDataRegister, 'This is register data');
//         setFormDataRegister(initialStateRegister)
//       } else {
//         toast.error(data?.payload?.message)
//       }
//     })
//   }
//   console.log(formDataRegister, 'formData Register');

//   return (
//     <div className='container'>
//       {/* Login */}
//       <div className='form-box login'>
//         <form action="#">
//           <h1>Login</h1>
//           <div className='input-box'>
//             <input type='text' placeholder='Username' value={formDataLogin.userName} onChange={(e) => setFormDataLogin({
//               ...formDataLogin,
//               userName: e.target.value
//             })} required />
//             {/* <i className='bx bxs-user'></i> */}
//             <FaUser className='icon' />

//           </div>
//           <div className='input-box'>
//             <input type='password' placeholder='Password' value={formDataLogin.password} onChange={(e) => setFormDataLogin({
//               ...formDataLogin,
//               password: e.target.value
//             })} required />
//             <FaLock className='icon' />
//           </div>
//           <div className='forget-link'>
//             <a href='#'>Forgot Password?</a>
//           </div>
//           <button onClick={onSubmit} type='submit' className='btn'>Login</button>
//           <p>or login with social media platforms</p>
//           <div className='social-icons'>
//             <a href='#'><FaGoogle className='icon' /></a>
//             <a href='#'><FaFacebookF className='icon' /></a>
//             <a href='#'><FaGithub className='icon' /></a>
//             <a href='#'><FaLinkedinIn className='icon' /></a>
//           </div>
//         </form>
//       </div>

//       {/* Register */}

//       <div className='form-box register'>
//         <form action="#" onSubmit={onSubmit}>
//           <h1>Registration</h1>
//           <div className='input-box'>
//             <input type='text' placeholder='Username' value={formDataRegister.userName} onChange={(e) => setFormDataRegister({
//               ...formDataRegister,
//               userName: e.target.value
//             })} required />
//             <FaUser className='icon' />
//           </div>
//           <div className='input-box'>
//             <input type='email' placeholder='Email' value={formDataRegister.email} onChange={(e) => setFormDataRegister({
//               ...formDataRegister,
//               email: e.target.value
//             })} required />
//             <FaEnvelope className='icon' />
//           </div>
//           <div className='input-box'>
//             <input type='password' placeholder='Password' value={formDataRegister.password} onChange={(e) => setFormDataRegister({
//               ...formDataRegister,
//               password: e.target.value
//             })} required />
//             <FaLock className='icon' />
//           </div>
//           <div className='input-box'>
//             <input type='password' placeholder='Confirm Password' value={formDataRegister.confirmPassword} onChange={(e) => setFormDataRegister({
//               ...formDataRegister,
//               confirmPassword: e.target.value
//             })} required />
//             <FaLock className='icon' />
//           </div>
//           <button type='submit' className='btn'>Register</button>
//           <p>or register with social media platforms</p>
//           <div className='social-icons'>
//             <a href='#'><FaGoogle className='icon' /></a>
//             <a href='#'><FaFacebookF className='icon' /></a>
//             <a href='#'><FaGithub className='icon' /></a>
//             <a href='#'><FaLinkedinIn className='icon' /></a>
//           </div>
//         </form>
//       </div>


//       <div className='toggle-box'>
//         <div className='toggle-panel toggle-left'>
//           <h1>Hello Welcome!</h1>
//           <p>Don't have an account?</p>
//           <button onClick={() => { document.querySelector('.container').classList.add('active') }} className='btn register-btn'>Register</button>
//         </div>

//         <div className='toggle-panel toggle-right'>
//           <h1>Welcome Back!</h1>
//           <p>Already have an account?</p>
//           <button onClick={() => { document.querySelector('.container').classList.remove('active') }} className='btn login-btn'>Login</button>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default Autherization;