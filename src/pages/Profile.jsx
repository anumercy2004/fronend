import React, { useState } from 'react';

function Profile({ user, onUpdateProfile, enrolledCount, completedCount, certificatesCount }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [email, setEmail] = useState(user?.email || 'alex@example.com');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 019-2834');
  const [education, setEducation] = useState(user?.education || 'B.S. in Computer Science');
  const [skills, setSkills] = useState(user?.skills ? user.skills.join(', ') : 'React.js, JavaScript, HTML5, Bootstrap 5');

  function handleSave(e) {
    e.preventDefault();
    const updated = {
      ...user,
      name,
      email,
      phone,
      education,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean)
    };
    onUpdateProfile(updated);
    console.log("Profile updated:", updated);
    setIsEditing(false);
  }

  return (
    <div className="container max-w-4xl py-2" style={{ maxWidth: '850px' }}>
      {/* Header Profile Card */}
      <div className="card p-4 p-md-5 border-0 shadow-sm mb-4">
        <div className="d-flex flex-column flex-sm-row items-center gap-4 text-center text-sm-start">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
            alt={user?.name}
            className="rounded-circle border border-primary p-1 shadow-sm"
            style={{ width: 100, height: 100, objectFit: 'cover' }}
          />

          <div className="flex-grow-1">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-1">
              <div>
                <h3 className="fw-bold mb-0 fs-4">{user?.name}</h3>
                <span className="text-muted small">{user?.email}</span>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1.5"
              >
                <i className={`bi ${isEditing ? 'bi-x-circle' : 'bi-pencil-square'}`}></i>
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
            </div>

            <p className="small text-muted mb-3">{user?.education}</p>

            <div className="d-flex flex-wrap gap-2">
              {(user?.skills || []).map((skill, idx) => (
                <span key={idx} className="badge bg-primary bg-opacity-10 text-primary badge-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="card p-4 border-0 shadow-sm mb-4">
          <h5 className="fw-bold fs-6 mb-3">Update Profile Information</h5>
          <form onSubmit={handleSave}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-muted">Full Name</label>
                <input
                  type="text"
                  required
                  className="form-control form-control-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold text-muted">Email Address</label>
                <input
                  type="email"
                  required
                  className="form-control form-control-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold text-muted">Phone Number</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold text-muted">Education Degree</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-semibold text-muted">Skills (comma separated)</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-outline-secondary btn-sm"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm px-3 fw-bold">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Metrics Strip */}
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card p-3 border-0 shadow-sm text-center">
            <i className="bi bi-book-half text-primary fs-3 mb-1"></i>
            <h4 className="fw-bold mb-0">{enrolledCount}</h4>
            <span className="text-muted small">Enrolled Courses</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 border-0 shadow-sm text-center">
            <i className="bi bi-check2-circle text-success fs-3 mb-1"></i>
            <h4 className="fw-bold mb-0">{completedCount}</h4>
            <span className="text-muted small">Completed Courses</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 border-0 shadow-sm text-center">
            <i className="bi bi-award-fill text-warning fs-3 mb-1"></i>
            <h4 className="fw-bold mb-0">{certificatesCount}</h4>
            <span className="text-muted small">Earned Certificates</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
