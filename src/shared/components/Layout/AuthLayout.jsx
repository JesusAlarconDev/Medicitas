import React from 'react'

export const AuthLayout = ({children}) => {
  return (
    <div className="bg-[url('/doctor-6701410_1920.jpg')] w-screen h-screen fixed top-0 left-0 z-0 bg-cover flex items-center justify-center p-4">
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout


