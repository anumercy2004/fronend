import React from 'react';

function NotificationPanel({ notifications, onClose, onMarkAsRead, onMarkAllAsRead }) {
  return (
    <div 
      className="position-fixed top-0 end-0 h-100 bg-white shadow-lg border-start p-4"
      style={{ 
        width: '360px', 
        zIndex: 1055, 
        marginTop: '60px',
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        overflowY: 'auto'
      }}
    >
      <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-bell-fill text-primary"></i>
          <h5 className="fw-bold mb-0 fs-6">Notifications</h5>
        </div>
        <button 
          className="btn btn-sm btn-close"
          onClick={onClose}
          aria-label="Close notifications"
        ></button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="small text-muted">{notifications.filter(n => !n.read).length} unread</span>
        <button 
          className="btn btn-link btn-sm text-primary p-0 text-decoration-none small"
          onClick={() => {
            onMarkAllAsRead();
            console.log("All notifications marked as read");
          }}
        >
          Mark all as read
        </button>
      </div>

      <div className="d-flex flex-column gap-2.5">
        {notifications.length === 0 ? (
          <p className="text-center text-muted small py-4">No notifications at this time.</p>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id}
              onClick={() => {
                onMarkAsRead(notif.id);
                console.log("Notification marked read:", notif.title);
              }}
              className={`p-3 rounded-3 border transition-all cursor-pointer ${
                notif.read ? 'opacity-75 bg-light dark:bg-dark border-transparent' : 'border-primary bg-primary bg-opacity-10'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between align-items-start mb-1">
                <span className="fw-bold small text-body">{notif.title}</span>
                <span className="text-muted" style={{ fontSize: '0.72rem' }}>{notif.timestamp}</span>
              </div>
              <p className="small text-muted mb-0" style={{ fontSize: '0.8rem' }}>
                {notif.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationPanel;
