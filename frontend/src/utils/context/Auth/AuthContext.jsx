import { createContext, useState } from 'react'
import React from 'react'
import { getItem } from '../../../services/LocalStorage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
   const [userAuthLocalStorage, setAuthLocalStorage] = useState(() => {
      // getting stored value
      const saved = JSON.parse(localStorage.getItem('userAuth'))
      return saved
   })
   console.log('userAuthLocalStorage : ', userAuthLocalStorage)

   const [isAuthenticated, setIsAuthenticated] = useState(userAuthLocalStorage)

   return (
      <AuthContext.Provider value={[ isAuthenticated, setIsAuthenticated] }>
         {children}²
      </AuthContext.Provider>
   ) 
}
