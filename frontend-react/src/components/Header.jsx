import { useContext } from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../AuthProvider"

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      <style>{`
        /* Responsive Header override */
        .header-glass {
            height: 110px;
            padding: 10px 40px;
            transition: all 0.3s ease;
        }
        
        .header-logo-img {
            height: 60px;
            width: auto;
            transition: all 0.3s ease;
        }

        @media (max-width: 576px) {
            .header-glass {
                padding: 10px 16px !important;
                height: auto !important;
                min-height: 75px !important;
            }
            .header-glass .navbar {
                padding: 0 !important;
                width: 100%;
            }
            .header-logo-img {
                height: 36px !important;
            }
            .header-glass .d-flex {
                gap: 6px !important;
            }
            .header-glass .btn-sm {
                padding: 6px 12px !important;
                font-size: 0.8rem !important;
            }
        }
      `}</style>
      <header className="header-glass">
        <nav className="navbar container py-2 d-flex flex-row justify-content-between align-items-center">
          {/* Logo — always on the left */}
          <Link
            className="navbar-brand m-0 p-0 flex-shrink-0"
            to="/"
          >
            <img
              src="public/textlogo.png"
              alt="Logo"
              className="header-logo-img"
            />
          </Link>

          {/* Buttons — always on the right */}
          <div className="d-flex flex-row gap-2 align-items-center flex-shrink-0">
            {isLoggedIn ? (
              <>
                <Button text="Dashboard" class="btn-info btn-sm" to="/dashboard" />
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Button text="Login" class="btn-outline-info btn-sm" to="/login" />
                <Button text="Register" class="btn-info btn-sm" to="/register" />
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;