import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import About from './pages/aboutus';
import Analytics from './pages/analytics';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/about' element={<About />} />
          <Route path='/analytics' element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;