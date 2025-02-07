import Home from './pages/Home'
import Login from './pages/Login';
import CameraApp from './pages/Camera';
import LoadingPage from './pages/confirmation/Loading';
import AcceptedPage from './pages/confirmation/Accepted';
import RejectedPage from './pages/confirmation/Rejected';
import './index.css'
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from './components/ui/Navbar';
import AuthNavbar from './components/ui/LoginNavbar';
import Register from './pages/Register';

function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login";

    return (
        <div>
            {isAuthPage ? <AuthNavbar /> : <Navbar />}
            <main>{children}</main>
        </div>
    );
}

function App() {

  return (
    <div>
      
       <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/camera" element={<CameraApp />} />
                    <Route path="/loading" element={<LoadingPage />} />
                    <Route path="/accepted" element={<AcceptedPage />} />
                    <Route path="/rejected" element={<RejectedPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </div>
  )
}

export default App
