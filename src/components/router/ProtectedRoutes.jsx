import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {

  let isLogged = localStorage.getItem('token')

  if (!isLogged) {
    return <Navigate to="/" />
  }

  return (
   <Outlet />
  )
}

export default ProtectedRoutes