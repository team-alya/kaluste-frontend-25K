import { useState } from 'react'
import './index.css'
import './App.css'
import CameraApp from './pages/Camera'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CameraApp />
    </>
  )
}

export default App
