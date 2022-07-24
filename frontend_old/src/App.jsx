import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'

function App() {
   return (
      <BrowserRouter>
         <div className="main">
            <Header />
            <Routes>
               <Route path="/" element={<Home />} />
            </Routes>
         </div>
      </BrowserRouter>
   )
}

export default App
