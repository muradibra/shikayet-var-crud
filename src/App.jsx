import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import Home from './components/pages/Home/Home'

// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/style/main.css'

function App() {

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
