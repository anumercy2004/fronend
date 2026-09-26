import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ 
  user, 
  onLogout, 
  theme, 
  onToggleTheme, 
  wishlistCount, 
  enrolledCount, 
  unreadNotifsCount, 
  onToggleNotifications,
  onToggleSidebar 
}) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top px-3 py-2">
      <div className="container-fluid">
        {/* Mobile Sidebar Toggle & Brand */}
        <div className="d-flex align-items-center gap-2">
          {user && (
            <button 
              className="btn btn-outline-secondary btn-sm d-lg-none"
              onClick={onToggleSidebar}
              aria-label="Toggle Navigation Sidebar"
            >
              <i className="bi bi-list fs-5"></i>
            </button>
          )}

          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold text-primary m-0">
            <div className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center" style={{ width: 38, height: 38 }}>
              <i className="bi bi-mortarboard-fill fs-5"></i>
            </div>
            <span className="fs-5 tracking-tight text-decoration-none">
              Learn<span className="text-secondary">Sphere</span>
            </span>
          </Link>
        </div>

        {/* Center Nav Links */}
        <div className="d-none d-md-flex align-items-center gap-3 ms-4">
          <Link to="/courses" className="nav-link text-body fw-semibold px-2">
            <i className="bi bi-grid me-1 text-primary"></i> Explore Courses
          </Link>
          {user && (
            <>
              <Link to="/my-learning" className="nav-link text-body fw-semibold px-2">
                <i className="bi bi-play-circle me-1 text-primary"></i> My Learning
                {enrolledCount > 0 && (
                  <span className="badge bg-primary rounded-pill ms-1.5">{enrolledCount}</span>
                )}
              </Link>
              <Link to="/quizzes" className="nav-link text-body fw-semibold px-2">
                <i className="bi bi-patch-question me-1 text-primary"></i> Quizzes
              </Link>
            </>
          )}
        </div>

        {/* Right Controls */}
        <div className="d-flex align-items-center gap-2 ms-auto">
          {/* Theme Toggle */}
          <button 
            className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 36, height: 36 }}
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <i className="bi bi-sun-fill text-warning"></i>
            ) : (
              <i className="bi bi-moon-stars-fill text-primary"></i>
            )}
          </button>

          {user ? (
            <>
              {/* Wishlist Link */}
              <Link 
                to="/wishlist" 
                className="btn btn-outline-secondary btn-sm rounded-circle position-relative d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36 }}
                title="Wishlist"
              >
                <i className="bi bi-heart text-danger"></i>
                {wishlistCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Notifications Toggle Button */}
              <button 
                className="btn btn-outline-secondary btn-sm rounded-circle position-relative d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36 }}
                onClick={onToggleNotifications}
                title="Notifications"
              >
                <i className="bi bi-bell"></i>
                {unreadNotifsCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ fontSize: '0.65rem' }}>
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {/* User Dropdown / Profile Avatar */}
              <div className="dropdown">
                <button 
                  className="btn btn-link p-0 border-0 text-decoration-none dropdown-toggle d-flex align-items-center gap-2"
                  type="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                  onClick={() => navigate('/profile')}
                >
                  <img 
                    src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"} 
                    alt={user.name} 
                    className="rounded-circle border border-primary"
                    style={{ width: 36, height: 36, objectFit: 'cover' }}
                  />
                  <span className="d-none d-xl-inline text-body fw-bold small">{user.name.split(' ')[0]}</span>
                </button>
              </div>

              {/* Logout button */}
              <button 
                className="btn btn-outline-danger btn-sm d-none d-sm-inline-flex align-items-center gap-1"
                onClick={onLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <Link to="/login" className="btn btn-outline-primary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
