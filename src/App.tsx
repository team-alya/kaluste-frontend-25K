import Home from "./pages/Home";
import Login from "./pages/Login";
import CameraApp from "./pages/Camera";
import LoadingPage from "./pages/confirmation/Loading";
import AcceptedPage from "./pages/confirmation/Accepted";
import RejectedPage from "./pages/confirmation/Rejected";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import AuthNavbar from "./components/ui/LoginNavbar";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

// Layout component to render Navbar based on the page
//Children prop is the content of the page
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/";

  // If the page is the login page, render the AuthNavbar and if not, render the Navbar
  return (
    <div>
      {isAuthPage ? <AuthNavbar /> : <Navbar />}
      {/* Render the content of the page */}
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
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/camera" element={<CameraApp />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/accepted" element={<AcceptedPage />} />
            <Route path="/rejected" element={<RejectedPage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
