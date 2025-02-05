import Home from './pages/Home'
import CameraApp from './pages/Camera';
import LoadingPage from './pages/confirmation/Loading';
import AcceptedPage from './pages/confirmation/Accepted';
import RejectedPage from './pages/confirmation/Rejected';
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
            <Route path="loading" element={<LoadingPage />} />
            <Route path="accepted" element={<AcceptedPage />} />
            <Route path="rejected" element={<RejectedPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
