import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import CameraApp from "./pages/Camera";
import LoadingPage from "./pages/confirmation/Loading";
import AcceptedPage from "./pages/confirmation/Accepted";
import RejectedPage from "./pages/confirmation/Rejected";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import AuthNavbar from "./components/ui/LoginNavbar";
import Settings from "./pages/Settings";
import { useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import FetchAllEvals from "./pages/FetchAllEvals";
import EvalDetails from "./pages/EvaluationDetails";
import ErrorInfo from "./pages/Error";


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

// check if user is authenticated before navigating 
const PrivateRoutes = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        setAuthenticated(false);
    }
}, [setAuthenticated]);

  if (!authenticated) return <Navigate to='/' replace />
  return <Outlet />
}

function App() {

  

  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              {/* add here routes that an UNauthenticated user can see */}
              <Route index element={<Login />} />

              <Route element ={<PrivateRoutes />}>
                {/* add here routes that an authenticated user can see */}
                <Route path="home" element={<Home />} />
                <Route path="/camera" element={<CameraApp />} />
                <Route path="/loading" element={<LoadingPage />} />
                <Route path="/rejected" element={<RejectedPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/error" element={<ErrorInfo />} />
                <Route path="/evals" element={<FetchAllEvals />} />
                <Route path="/eval/:id" element={<EvalDetails />} />
                <Route path="/accepted" element={<AcceptedPage />} />

              </Route>
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
