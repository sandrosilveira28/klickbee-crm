"use client";
import React from 'react'
import SideBar from './SideBar'
import NavBar from './NavBar'

const AppLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-h-screen">
        <NavBar />
        <div className="p-6 flex-1">
          Main Content Here
        </div>
      </div>
    </div>
  )
}

export default AppLayout
