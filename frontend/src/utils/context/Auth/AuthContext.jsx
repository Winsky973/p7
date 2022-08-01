import { createContext, useState } from 'react'
import React from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
   const [userAuthLocalStorage, setAuthLocalStorage] = useState(() => {
      // getting stored value
      const saved = JSON.parse(localStorage.getItem('userAuth'))
      return saved
   })
   const [isAuthenticated, setIsAuthenticated] = useState(userAuthLocalStorage)
   console.log('userAuthLocalStorage : ', userAuthLocalStorage)


   return (
      <AuthContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
         {children}
      </AuthContext.Provider>
   )
}
