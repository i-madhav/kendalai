import React from 'react'

const LoginLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>{children}</div>
  )
}

export default LoginLayout