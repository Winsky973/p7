import { useContext, React } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

//Pages
import Home from './Pages/Home/Home'
import Header from './components/Header/Header'
import Error from './components/Error/Error'
import UpdatePost from './Pages/UpdatePost/Modify'
import CreatePost from './Pages/CreatePost'
import Signin from './Pages/Signin/Signin'
import Signup from './Pages/Signup/Signup'
import SinglePost from './Pages/Single-post/SinglePost'
import { AuthProvider} from './utils/context/Auth/AuthContext'
import PrivateRoutes from './utils/PrivateRoutes/PrivateRoutes'

const App = () => {
   return (
      <div className="main">
         <AuthProvider>
            <Header />
            <Routes>
               <Route element={<PrivateRoutes />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/modify" element={<UpdatePost />} />
                  <Route path="/modify/:id" element={<UpdatePost />} />
                  <Route path="/create" element={<CreatePost />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/single-post/:id" element={<SinglePost />} />
                  <Route path="*" element={<Error />} />
               </Route>
            </Routes>
         </AuthProvider>
      </div>
   )
}

export default App
