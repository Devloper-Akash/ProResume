import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Pricing from './pages/Pricing';

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/builder" element={<Builder />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/pricing" element={<Pricing />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
