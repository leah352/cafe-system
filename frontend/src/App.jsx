import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

// Lazy load pages for better performance
const Login = lazy(() => import('./pages/auth/Login'));
const Home = lazy(() => import('./pages/customer/Home'));
const Menu = lazy(() => import('./pages/customer/Menu'));
const Cart = lazy(() => import('./pages/customer/Cart'));
const Checkout = lazy(() => import('./pages/customer/Checkout'));
const TrackOrder = lazy(() => import('./pages/customer/TrackOrder'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const DeliveryOrders = lazy(() => import('./pages/admin/DeliveryOrders'));
const StaffDashboard = lazy(() => import('./pages/staff/StaffDashboard'));
import Navbar from './components/common/Navbar';

// Loading fallback component
const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
    <div style={{ color: 'rgba(255,255,255,0.6)' }}>Loading...</div>
  </div>
);

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
    <QueryClientProvider client={queryClient}>
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
            <Suspense fallback={<Loading />}>
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
            </Suspense>
          </div>
          <Toaster position="top-right" />
        </Router>
      </CartProvider>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
