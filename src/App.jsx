import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import Home from './components/pages/Home/Home'
import { ToastContainer } from 'react-toastify'
import UserItem from './components/User Detail/UserItem'

// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/style/main.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Home />} />
        <Route path='/users/:id' element={<UserItem />} />
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
