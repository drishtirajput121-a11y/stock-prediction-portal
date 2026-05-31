import { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from "../AuthProvider"

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="navbar-header-premium">
      <div className="navbar-container-premium">
        
        {/* LOGO */}
        <Link className="navbar-logo-link" to="/" onClick={() => setMobileMenuOpen(false)}>
          <img 
            src="/textlogo.png" 
            alt="Market Vision" 
            className="header-logo-img" 
          />
        </Link>



        {/* RIGHT AUTH BUTTONS (Hidden on mobile) */}
        <div className="navbar-auth-actions">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="auth-login-link">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="auth-register-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-login-link">
                Login
              </Link>
              <Link to="/register" className="auth-register-btn">
                Register
              </Link>
            </>
          )}
        </div>

        {/* HAMBURGER TOGGLE (Mobile only) */}
        <button 
          className={`hamburger-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation Menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

      </div>

      {/* MOBILE DRAWER MENU */}
      <div className={`mobile-navigation-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-links-wrapper">

          
          <div className="drawer-divider"></div>
          
          {isLoggedIn ? (
            <div className="drawer-auth-buttons">
              <Link 
                to="/dashboard" 
                className="drawer-login-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout} 
                className="drawer-register-btn"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="drawer-auth-buttons">
              <Link 
                to="/login" 
                className="drawer-login-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="drawer-register-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
