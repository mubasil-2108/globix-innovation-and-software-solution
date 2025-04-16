import React, { useState } from 'react'
import './admin-layout.css'
import AdminSidebar from '../sidebar'
import AdminHeader from '../header'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className='admin'>
      <div className='mainContainer'>
        <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
        <div style={{ width: '100%' }} className="flex flex-1 flex-col">
          <AdminHeader setOpen={setOpenSidebar} />
          <main className='main-layout' style={{overflowY:'scroll'}}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout