import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import About from './pages/aboutus';
import Analytics from './pages/analytics';
import ContactUs from './pages/contactus';
import LoadingScreen from './components/LoadingScreen'; // Import the new component

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Show the splash screen for 3 seconds
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 1. If we are still loading, show ONLY the loading screen
  if (initialLoading) {
    return <LoadingScreen />;
  }

  // 2. Once loading is done, show the actual website
  return (
    <Router>
      <div className="App animate-in fade-in duration-1000">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/about' element={<About />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/contact' element={<ContactUs />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;