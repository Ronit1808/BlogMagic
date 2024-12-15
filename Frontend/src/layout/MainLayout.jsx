import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'


const MainLayout = () => {
    return (
      <div className='flex flex-col min-h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]'>
          <NavBar />
          <Outlet />
          <Footer/>
      </div>
    )
  }

export default MainLayout