import { useState } from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'

export const API = "http://127.0.0.1:8000/"
function App() {
    const [count, setCount] = useState(0)

    return (
        <Routes>
            {/* Ruta por defecto redirige al login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Ruta del login */}
            <Route path="/login" element={<Login />} />

            {/* Ruta del registro */}
            <Route path="/register" element={<Register />} />

            {/* Puedes agregar más rutas aquí */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
    )
}

export default App
