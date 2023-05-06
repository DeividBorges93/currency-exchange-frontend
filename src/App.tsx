import { useState } from 'react'
import './App.css'
import Register from './pages/Register';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={ <Navigate to='/login' /> } />
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>

        </Routes>
      </Router>
    </div>
  )
}

export default App
