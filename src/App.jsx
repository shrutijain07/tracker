import { Container } from 'react-bootstrap'
import Signup from './Components/Signup'
import MainLayout from './Components/MainLayout'
import Login from './Components/Login'
import LeaveTracker from './Components/LeaveTracker'
import CompOffApplication from './Components/CompOffApplication'
import ActivityTracker from './Components/ActivityTracker'

import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute'
import ForgotPassword from './Components/ForgotPassword'

function App() {
  return (
    <Container className='d-flex align-items-center justify-content-center'
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<MainLayout />}> {/* Wrap all dashboard routes with MainLayout */}
                <Route path="/activity" element={<ActivityTracker />} />
                <Route path="/leave-tracker" element={<LeaveTracker />} />
                <Route path="/comp-off" element={<CompOffApplication />} />
                <Route path="*" element={<Navigate to="/activity" replace />} /> {/* Redirect unhandled paths */}
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </Container>
  )
}

export default App
