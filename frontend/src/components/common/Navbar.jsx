import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .navbar {
          background: var(--panel);
          border-bottom: 0.5px solid var(--panel-border);
          padding: 12px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-brand a {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-dark);
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-brand a:hover {
          color: var(--leaxie-accent-strong);
          transform: scale(1.05);
        }

        .nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav-links a {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-dark);
          text-decoration: none;
          transition: all 0.2s;
          position: relative;
          padding: 8px 0;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent-warm);
          transition: width 0.2s;
        }

        .nav-links a:hover {
          color: var(--accent-warm-2);
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .cart-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          border-radius: 8px;
          background: transparent;
          transition: all 0.18s;
          color: var(--accent-warm);
          border: 1px solid var(--panel-border);
        }

        .cart-link svg {
          width: 18px;
          height: 18px;
          color: inherit;
        }

        .cart-link:hover {
          background: var(--panel-contrast);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }

        .cart-count {
          position: absolute;
          top: -6px;
          right: -6px;
          background: var(--accent-warm);
          color: var(--panel-contrast);
          min-width: 18px;
          height: 18px;
          padding: 0 5px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          border: 2px solid var(--panel-contrast);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-dark);
          padding: 8px 16px;
          border-left: 0.5px solid var(--panel-border);
        }

        .logout-btn {
          background: var(--panel-contrast);
          border: 0.5px solid var(--panel-border);
          border-radius: 6px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dark);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }

        .logout-btn:hover {
          background: rgba(232,201,122,0.25);
          border-color: rgba(232,201,122,0.5);
          color: #f0d88e;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 12px 16px;
            gap: 16px;
          }

          .nav-brand a {
            font-size: 20px;
          }

          .nav-links {
            gap: 16px;
            flex-wrap: wrap;
          }

          .nav-links a {
            font-size: 11px;
          }

          .user-info {
            font-size: 11px;
            padding: 6px 12px;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            padding: 10px 12px;
            flex-direction: column;
            gap: 12px;
          }

          .nav-links {
            width: 100%;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
          }

          .nav-links a {
            font-size: 10px;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">☕ Leaxie</Link>
        </div>
        <div className="nav-links">
          {/* Show Menu/Cart only to customers (unauthenticated users or users without admin/staff roles) */}
          {(!user || (user && !['admin', 'staff'].includes(user.role))) && (
            <>
              <Link to="/menu">Menu</Link>
              <Link to="/about">About Us</Link>
              <Link to="/cart" className="cart-link">
                <FaShoppingCart />
                {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
              </Link>
              <Link to="/track">Track Order</Link>
            </>
          )}
          
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin">Admin</Link>}
              {user.role === 'staff' && <Link to="/staff">Staff</Link>}
              <span className="user-info"><FaUser /> {user.name}</span>
              <button onClick={handleLogout} className="logout-btn"><FaSignOutAlt /></button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
