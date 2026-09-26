import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-top py-4 mt-auto" style={{ backgroundColor: 'var(--card-bg)' }}>
      <div className="container">
        <div className="row gy-4 align-items-center justify-content-between">
          <div className="col-md-5 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
              <div className="bg-primary text-white rounded-3 p-1.5 d-flex align-items-center justify-content-center" style={{ width: 28, height: 28 }}>
                <i className="bi bi-mortarboard-fill"></i>
              </div>
              <span className="fw-bold text-primary">LearnSphere</span>
            </div>
            <p className="text-muted small mb-0">
              Modern Online Learning Management System built with React.js, JavaScript, and Bootstrap 5.
            </p>
          </div>

          <div className="col-md-7 text-center text-md-end">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3 mb-2">
              <Link to="/courses" className="text-decoration-none text-muted small">All Courses</Link>
              <Link to="/quizzes" className="text-decoration-none text-muted small">Quizzes</Link>
              <Link to="/certificates" className="text-decoration-none text-muted small">Certificates</Link>
              <Link to="/settings" className="text-decoration-none text-muted small">Settings</Link>
            </div>
            <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>
              © 2026 LearnSphere LMS. Open Developer Console (F12) to inspect real-time state logs.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
