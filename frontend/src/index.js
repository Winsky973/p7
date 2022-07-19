import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Error from './components/Error/Error'
import Modify from './Pages/Modify/Modify'
import Signin from './Pages/Signin/Signin'
import Signup from './Pages/Signup/Signup'

import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <BrowserRouter>
      <div className="main">
         <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modify" element={<Modify />} />
            <Route path="/modify/:id" element={<Modify />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="*" element={<Error />} />
         </Routes>
      </div>
      <Footer />
   </BrowserRouter>
)
