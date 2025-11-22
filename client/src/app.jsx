import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Stats from './pages/Stats'


export default function App() {
return (
<div className="min-h-screen bg-gray-50">
<Routes>
<Route path="/" element={<Dashboard />} />
<Route path="/code/:code" element={<Stats />} />
</Routes>
</div>
)
}