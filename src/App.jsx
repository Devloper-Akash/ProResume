import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
        <div className="app-container">
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
