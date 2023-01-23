import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="flex gap-2 md:gap-6 lg:gap-10 max-w-7xl mx-auto">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          {/* Sidebar */}
          <Sidebar />
        </div>

        {/* main */}
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
          <div className="flex flex-col gap-10 h-full">

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile