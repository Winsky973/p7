import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Pages
import Home from './Pages/Home/Home'
import Header from './components/Header/Header'
import Error from './components/Error/Error'
import UpdatePost from './Pages/UpdatePost/Modify'
import CreatePost from './Pages/CreatePost'
import Signin from './Pages/Signin/Signin'
import Signup from './Pages/Signup/Signup'
import SinglePost from './Pages/Single-post/SinglePost'
import { AuthProvider } from './utils/context/Auth/AuthContext'

const App = () => {
   return (
      <BrowserRouter>
         <div className="main">
            <AuthProvider>
            <Header />
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/modify" element={<UpdatePost />} />
                  <Route path="/modify/:id" element={<UpdatePost />} />
                  <Route path="/create" element={<CreatePost />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/single-post/:id" element={<SinglePost />} />
                  <Route path="*" element={<Error />} />
               </Routes>
            </AuthProvider>
         </div>
      </BrowserRouter>
   )
}

export default App
