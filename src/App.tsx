import Home from './pages/Home'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/ui/navbar';

function App() {

  return (
    <div>
      
      <BrowserRouter>
      <Navbar />
        <Routes>
        
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
