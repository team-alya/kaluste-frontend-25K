import Home from './pages/Home'
import Login from './pages/Login';
import CameraApp from './pages/Camera';
import LoadingPage from './pages/confirmation/Loading';
import AcceptedPage from './pages/confirmation/Accepted';
import RejectedPage from './pages/confirmation/Rejected';
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/ui/Navbar';
import Register from './pages/Register';
import Settings from './pages/Settings';

function App() {

  return (
    <div>
      
      <BrowserRouter>
      <Navbar />
        <Routes>
        
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="camera" element={<CameraApp />} />
            <Route path="loading" element={<LoadingPage />} />
            <Route path="accepted" element={<AcceptedPage />} />
            <Route path="rejected" element={<RejectedPage/>}/>
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
