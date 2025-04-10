import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Habitos from './pages/Habitos'
import Hoje from './pages/Hoje'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/habitos" element={<Habitos />} />
        <Route path="/hoje" element={<Hoje />} />
      </Routes>
    </Router>
  )
}

export default App
