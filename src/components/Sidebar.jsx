import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ isOpen, onClose, wishlistCount, enrolledCount, certificatesCount }) {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'bi-grid-fill' },
    { path: '/courses', label: 'Browse Courses', icon: 'bi-compass-fill' },
    { path: '/my-learning', label: 'My Learning', icon: 'bi-collection-play-fill', badge: enrolledCount },
    { path: '/wishlist', label: 'Saved Wishlist', icon: 'bi-heart-fill', badge: wishlistCount },
    { path: '/quizzes', label: 'Interactive Quizzes', icon: 'bi-patch-question-fill' },
    { path: '/certificates', label: 'My Certificates', icon: 'bi-award-fill', badge: certificatesCount },
    { path: '/profile', label: 'My Profile', icon: 'bi-person-badge-fill' },
    { path: '/settings', label: 'Settings', icon: 'bi-gear-fill' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`sidebar-custom p-3 position-fixed top-0 start-0 h-100 d-flex flex-col justify-content-between transition-all ${
          isOpen ? 'd-block' : 'd-none d-lg-block'
        }`}
        style={{ 
          width: '260px', 
          zIndex: 1045, 
          marginTop: '60px',
          overflowY: 'auto'
        }}
      >
        <div>
          {/* Mobile close button */}
          <div className="d-flex justify-content-between align-items-center mb-3 d-lg-none">
            <span className="small fw-bold text-uppercase text-muted">Navigation Menu</span>
            <button className="btn btn-sm btn-close" onClick={onClose}></button>
          </div>

          <div className="small fw-bold text-uppercase text-muted px-3 mb-2" style={{ letterSpacing: '0.05em' }}>
            Main Portal
          </div>

          <nav className="nav flex-column gap-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => 
                  `sidebar-link d-flex justify-content-between align-items-center ${isActive ? 'active' : ''}`
                }
              >
                <div className="d-flex align-items-center gap-2.5">
                  <i className={`bi ${item.icon} fs-5`}></i>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="badge bg-primary rounded-pill small">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Learning streak card */}
        <div className="card p-3 border-0 bg-primary bg-opacity-10 mt-4 mb-5">
          <div className="d-flex align-items-center gap-2 mb-1">
            <i className="bi bi-fire text-danger fs-5"></i>
            <span className="fw-bold small text-primary">Daily Learning Streak</span>
          </div>
          <p className="text-muted small mb-2" style={{ fontSize: '0.8rem' }}>
            You've completed 3 lessons this week. Keep up the momentum!
          </p>
          <div className="progress" style={{ height: 6 }}>
            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '60%' }}></div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
