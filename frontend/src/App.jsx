import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

// Pages
import Login from './pages/auth/Login';
import Home from './pages/customer/Home';
import Menu from './pages/customer/Menu';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import TrackOrder from './pages/customer/TrackOrder';
import AdminDashboard from './pages/admin/Dashboard';
import DeliveryOrders from './pages/admin/DeliveryOrders';
import StaffDashboard from './pages/staff/StaffDashboard';
import Navbar from './components/common/Navbar';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;

  return children;
};

const CustomerRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  // If logged-in user is admin or staff, redirect them away from customer pages
  if (user && ['admin', 'staff'].includes(user.role)) {
    if (user.role === 'admin') return <Navigate to="/admin" />;
    if (user.role === 'staff') return <Navigate to="/staff" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

            :root { --bg-root: #0a0806; --bg-panel: #0f0c09; --gold: #e8c97a; --muted-gold: rgba(232,201,122,0.7); }

            .container {
              max-width: 1200px;
              margin: 24px auto;
              padding: 0 20px;
              box-sizing: border-box;
            }

            body { background: linear-gradient(180deg, var(--bg-root), var(--bg-panel)); color: rgba(255,255,255,0.9); font-family: 'DM Sans', sans-serif; }

            /* small helpers used across pages */
            .btn-primary { padding: 8px 12px; background: linear-gradient(135deg,var(--gold),#f0d88e); border-radius:8px; border:none; color:#0f0c09; cursor:pointer }
            .btn-danger { padding:8px 12px; background: rgba(255,107,107,0.12); border-radius:8px; border:0.5px solid rgba(255,107,107,0.18); color:#ff6b6b }
          `}</style>
          <Navbar />
          <div className="container">
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={<CustomerRoute><Home /></CustomerRoute>} />
              <Route path="/menu" element={<CustomerRoute><Menu /></CustomerRoute>} />
              <Route path="/cart" element={<CustomerRoute><Cart /></CustomerRoute>} />
              <Route path="/checkout" element={<CustomerRoute><Checkout /></CustomerRoute>} />
              <Route path="/track" element={<CustomerRoute><TrackOrder /></CustomerRoute>} />
              <Route path="/track/:orderNumber" element={<CustomerRoute><TrackOrder /></CustomerRoute>} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />

              {/* Admin Routes */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/admin/deliveries"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <DeliveryOrders />
                  </ProtectedRoute>
                }
              />

              {/* Staff Routes */}
              <Route 
                path="/staff/*" 
                element={
                  <ProtectedRoute roles={['staff', 'admin']}>
                    <StaffDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
          <Toaster position="top-right" />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
