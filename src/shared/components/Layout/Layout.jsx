import React from 'react'

export const Layout = ({children}) => {
  return (
    <div className="bg-[url(../public/doctor-6701410_1920.jpg)] w-screen h-screen fixed top-0 left-0 z-0 bg-cover flex flex-col justify-center items-center">
      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-6xl bg-white bg-opacity-90 rounded-2xl shadow-xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout


