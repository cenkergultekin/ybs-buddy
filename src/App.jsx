import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DersNotlari from './pages/DersNotlari';
import SinavSimulasyonu from './pages/SinavSimulasyonu';
import NotAlani from './pages/NotAlani';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ders-notlari" element={<DersNotlari />} />
          <Route path="/sinav-simulasyonu" element={<SinavSimulasyonu />} />
          <Route path="/not-alani" element={<NotAlani />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
