import Home from './pages/Home'
import CameraApp from './pages/Camera';
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/ui/Navbar';



function App() {

  return (
    <div>
      
      <BrowserRouter>
      <Navbar />
        <Routes>
        
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="camera" element={<CameraApp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
