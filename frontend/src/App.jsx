import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import DersNotlari from './pages/DersNotlari';
import SinavSimulasyonu from './pages/SinavSimulasyonu';
import NotAlani from './pages/NotAlani';
import Mufredat from './pages/Mufredat';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ders-notlari" element={<DersNotlari />} />
            <Route path="/sinav-simulasyonu" element={<SinavSimulasyonu />} />
            <Route path="/not-alani" element={<NotAlani />} />
            <Route path="/mufredat" element={<Mufredat />} />
          </Routes>
        </PageTransition>
      </div>
    </Router>
  );
}

export default App;
