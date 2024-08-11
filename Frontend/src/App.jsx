import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Roomclean_main from './pages/Roomclean_main';
import Profile from './pages/Profile';
import Register from './pages/register';
import Maintenance_main from './pages/M_main';

import { useSelector } from 'react-redux';
import Admin_login from './admin_pages/Login';
import Admin_dashboard from './admin_pages/Admin_dashboard';
import Roomcleaning_requests from './admin_pages/Roomclean_requests';
import StudentProtectedRoute from './components/studentprotected_route';
import AdminProtectedRoute from './components/adminprotected_route';
import AdminHeader from './components/AdminHeader';
import Maintenance_requests from './admin_pages/Maintenance_request';
import Admin_Profile from './admin_pages/Admin_profile';


function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentAdmin = useSelector((state) => state.admin.currentAdmin);

  return (
    <Router>
      {currentUser && <Header />}
      {currentAdmin && <AdminHeader />}

      <Routes>
        {!currentUser && !currentAdmin ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Admin_login />} />
          </>
        ) : (
          <>
            {/* Student Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <StudentProtectedRoute>
                  <Dashboard />
                </StudentProtectedRoute>
              }
            />
            <Route
              path="/roomcleaning"
              element={
                <StudentProtectedRoute>
                  <Roomclean_main />
                </StudentProtectedRoute>
              }
            />
            <Route
              path="/maintenance"
              element={
                <StudentProtectedRoute>
                  <Maintenance_main />
                </StudentProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <StudentProtectedRoute>
                  <Profile />
                </StudentProtectedRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <Admin_dashboard />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/roomclean"
              element={
                <AdminProtectedRoute>
                  <Roomcleaning_requests />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/maintenance"
              element={
                <AdminProtectedRoute>
                  <Maintenance_requests />
                </AdminProtectedRoute>
              }
            />
             <Route
              path="/admin/profile"
              element={
                <AdminProtectedRoute>
                  <Admin_Profile />
                </AdminProtectedRoute>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
