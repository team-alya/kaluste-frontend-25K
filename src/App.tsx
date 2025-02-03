import Home from './pages/Home'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {

  return (
    <div>
      <BrowserRouter>
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
