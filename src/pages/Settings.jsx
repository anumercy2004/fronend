import React, { useState } from 'react';

function Settings({ theme, onToggleTheme, onClearData, onLogout }) {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [quizReminders, setQuizReminders] = useState(true);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  function handleThemeChange() {
    onToggleTheme();
  }

  function handleClear() {
    onClearData();
    setShowConfirmClear(false);
  }

  return (
    <div className="container max-w-3xl py-2" style={{ maxWidth: '800px' }}>
      <div className="mb-4">
        <h2 className="fw-bold mb-1 fs-3">Application Settings</h2>
        <p className="text-muted small mb-0">Configure student portal preferences, theme mode, and cached state</p>
      </div>

      {/* 1. Theme Setting */}
      <div className="card p-4 border-0 shadow-sm mb-4">
        <h5 className="fw-bold fs-6 mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-palette-fill text-primary"></i>
          <span>Theme & Interface</span>
        </h5>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="fw-bold mb-1 small">Appearance Mode</h6>
            <p className="text-muted small mb-0">
              Current mode: <strong className="text-body text-capitalize">{theme}</strong>
            </p>
          </div>

          <button
            onClick={handleThemeChange}
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
          >
            {theme === 'dark' ? (
              <>
                <i className="bi bi-sun-fill text-warning"></i>
                <span>Switch to Light Mode</span>
              </>
            ) : (
              <>
                <i className="bi bi-moon-stars-fill text-primary"></i>
                <span>Switch to Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Notification Preferences */}
      <div className="card p-4 border-0 shadow-sm mb-4">
        <h5 className="fw-bold fs-6 mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-bell-fill text-primary"></i>
          <span>Notification Preferences</span>
        </h5>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="emailAlertsSwitch"
            checked={emailAlerts}
            onChange={() => {
              setEmailAlerts(!emailAlerts);
              console.log("Email alerts toggled:", !emailAlerts);
            }}
          />
          <label className="form-check-label small fw-semibold" htmlFor="emailAlertsSwitch">
            Course Announcement Emails
          </label>
          <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>
            Receive updates when instructors post new supplementary video lessons.
          </p>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="quizRemindersSwitch"
            checked={quizReminders}
            onChange={() => {
              setQuizReminders(!quizReminders);
              console.log("Quiz reminders toggled:", !quizReminders);
            }}
          />
          <label className="form-check-label small fw-semibold" htmlFor="quizRemindersSwitch">
            Assessment & Streak Reminders
          </label>
          <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>
            Get alerts to complete pending chapter quizzes and earn course certificates.
          </p>
        </div>
      </div>

      {/* 3. Account Actions & Reset */}
      <div className="card p-4 border-0 shadow-sm mb-4 border-danger border-opacity-25">
        <h5 className="fw-bold fs-6 mb-2 text-danger d-flex align-items-center gap-2">
          <i className="bi bi-shield-exclamation"></i>
          <span>Data Management & Session</span>
        </h5>
        <p className="text-muted small mb-3">
          Reset all demo enrollments, saved wishlists, and quiz scores back to factory state.
        </p>

        <div className="d-flex flex-wrap gap-2">
          {!showConfirmClear ? (
            <button
              onClick={() => setShowConfirmClear(true)}
              className="btn btn-outline-danger btn-sm"
            >
              <i className="bi bi-trash3 me-1"></i> Clear Local Storage Demo Data
            </button>
          ) : (
            <div className="bg-danger bg-opacity-10 p-3 rounded-3 border border-danger border-opacity-25 w-100">
              <p className="small text-danger fw-bold mb-2">
                Are you sure you want to reset all enrolled courses, quiz results, and wishlist items?
              </p>
              <div className="d-flex gap-2">
                <button
                  onClick={handleClear}
                  className="btn btn-danger btn-sm fw-bold"
                >
                  Yes, Reset All Data
                </button>
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <button
            onClick={onLogout}
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="bi bi-box-arrow-right me-1"></i> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
