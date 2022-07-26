import { createContext, useState } from 'react'
import React from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const toggleAuthenticated = () => {
      setIsAuthenticated(isAuthenticated === false ? true : false)
   }

   return (
      <AuthContext.Provider value={{ isAuthenticated, toggleAuthenticated }}>
         {children}
      </AuthContext.Provider>
   ) 
}
