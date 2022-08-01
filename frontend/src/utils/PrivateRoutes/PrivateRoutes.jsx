import { React, useContext } from 'react'
import { AuthContext } from '../context/Auth/AuthContext'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const [auth, setAuth] = useContext(AuthContext)
   let userIsAuthenticated = true
   return (userIsAuthenticated ? <Outlet /> : <Navigate to={'/signin'} />)
}

export default PrivateRoutes
