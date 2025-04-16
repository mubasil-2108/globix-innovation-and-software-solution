import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AdminLayout } from './components/admin';
import { AdminDashboard, AdminProject } from './pages/admin';
import { checkAuth } from './store/auth-slice';
import CheckAuth from './components/common/check-auth';
import { AuthLayout} from './components/auth';
import { AuthLogin, AuthRegister, } from './pages/auth';
import { UserLayout } from './components/user';
import { AboutUsPage, Home, NotFoundPage,UnauthorizedPage } from './pages/user';

function App() {
  // const isAuthenticated = false;
  // const user = null;
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>} />
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="register" element={<AuthRegister />} />
          <Route path="login" element={<AuthLogin />} />
          {/* <Route path="forget-password" element={<ForgetPassword />}/> */}
        </Route>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='projects' element={<AdminProject />} />
        </Route>
        <Route path='/user' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <UserLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<Home />} />
          <Route path='about' element={<AboutUsPage/>} />
        </Route>
        <Route path='unauth-page' element={<UnauthorizedPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
