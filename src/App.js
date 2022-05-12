import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Register from './pages/register'
import Login from './pages/login'

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* <Route path="home" element={<Home/>}/>
                <Route path="" element={<Home/>}/> */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
