import React, { useState } from 'react'
import './home-layout.css'
import { Outlet } from 'react-router-dom'
import UserHeader from '../header';
import Footer from '../footer';

const UserLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div style={{ width: '100%', }}>
      <UserHeader setOpen={setOpenSidebar} />
      <main style={{ overflowX: 'hidden', backgroundColor: '#000 ', margin: 0, padding: 0 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout