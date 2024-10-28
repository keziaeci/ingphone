import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './Pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
