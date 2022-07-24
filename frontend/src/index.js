import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Error from './components/Error/Error'
import UpdatePost from './Pages/UpdatePost/Modify'
import CreatePost from './Pages/CreatePost'
import Signin from './Pages/Signin/Signin'
import Signup from './Pages/Signup/Signup'
import useState from 'react'
import App from './App'

// Context

import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
   <App />
   // <BrowserRouter>
   //    <div className="main">
   //       <Header />
   //       <Routes>
   //          <Route path="/" element={<Home />} />
   //          <Route path="/modify" element={<UpdatePost />} />
   //          <Route path="/modify/:id" element={<UpdatePost />} />
   //          <Route path="/create" element={<CreatePost />} />
   //          <Route path="/signup" element={<Signup />} />
   //          <Route path="/signin" element={<Signin />} />
   //          <Route path="*" element={<Error />} />
   //       </Routes>
   //    </div>
   //    <Footer />
   // </BrowserRouter>
)
