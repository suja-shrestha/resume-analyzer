import Home from './pages/home.jsx';
import Navbar from './components/Navbar.jsx';
import OfflineStatus from './components/OfflineStatus';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Home />
      <OfflineStatus />
    </div>
  );
}

export default App;