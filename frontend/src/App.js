import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Pages
import Home from './Pages/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Error from './components/Error/Error'
import UpdatePost from './Pages/UpdatePost/Modify'
import CreatePost from './Pages/CreatePost'
import Signin from './Pages/Signin/Signin'
import Signup from './Pages/Signup/Signup'

const App = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(false)

   return (
      <BrowserRouter>
         <div className="main">
            <Header />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/modify" element={<UpdatePost />} />
               <Route path="/modify/:id" element={<UpdatePost />} />
               <Route path="/create" element={<CreatePost />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/signin" element={<Signin />} />
               <Route path="*" element={<Error />} />
            </Routes>
         </div>
      </BrowserRouter>
   )
}

export default App
