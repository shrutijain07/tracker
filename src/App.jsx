import Signup from './Components/Signup';
import MainLayout from './Components/MainLayout';
import Login from './Components/Login';
import LeaveTracker from './Components/LeaveTracker';
import CompOffApplication from './Components/CompOffApplication';
import ActivityTracker from './Components/ActivityTracker';
import ForgotPassword from './Components/ForgotPassword';

import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import AuthLayout from './Components/AuthLayout';
import './style.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
          {/* Public Routes with centered layout */}
          <Route element={<AuthLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Protected Routes with MainLayout */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/activity" element={<ActivityTracker />} />
              <Route path="/leave-tracker" element={<LeaveTracker />} />
              <Route path="/comp-off" element={<CompOffApplication />} />
              <Route path="*" element={<Navigate to="/activity" replace />} />
            </Route>
          </Route>
        </Routes>
    </AuthProvider>
  );
}

export default App;
