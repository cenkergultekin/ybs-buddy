import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import DersNotlari from './pages/DersNotlari';
import SinavSimulasyonu from './pages/SinavSimulasyonu';
import NotAlani from './pages/NotAlani';
import MezunTavsiyeleri from './pages/MezunTavsiyeleri';
import YbsStaj from './pages/YbsStaj';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ders-notlari" element={<DersNotlari />} />
          <Route path="/sinav-simulasyonu" element={<SinavSimulasyonu />} />
          <Route path="/not-alani" element={<NotAlani />} />
          <Route path="/mezun-tavsiyeleri" element={<MezunTavsiyeleri />} />
          <Route path="/ybs-staj" element={<YbsStaj />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
