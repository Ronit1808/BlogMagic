import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { ToastContainer} from 'react-toastify';


const MainLayout = () => {
    return (
      <div className='flex flex-col min-h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]'>
          <NavBar />
          <ToastContainer theme="dark" />
          <Outlet />
          <Footer/>
      </div>
    )
  }

export default MainLayout