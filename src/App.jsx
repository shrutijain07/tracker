import { Container } from 'react-bootstrap'
import Signup from './Components/Signup'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute'
import ForgotPassword from './Components/ForgotPassword'

function App() {
  return (
    <Container className='d-flex align-items-center justify-content-center'
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <AuthProvider>
          <Routes>
            {/* <PrivateRoute path="/" element={<Dashboard />} /> */}
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </div>
    </Container>
  )
}

export default App
