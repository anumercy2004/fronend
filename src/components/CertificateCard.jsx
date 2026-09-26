import React from 'react';

function CertificateCard({ certificate, studentName, onDownload }) {
  return (
    <div className="card border-0 shadow-sm overflow-hidden h-100">
      <div className="card-body p-4 text-center d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-center mb-3">
            <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
              <i className="bi bi-award-fill fs-2"></i>
            </div>
          </div>

          <span className="badge bg-success bg-opacity-10 text-success badge-pill mb-2">
            <i className="bi bi-patch-check-fill me-1"></i> Verified Credential
          </span>

          <h5 className="fw-bold mb-1">{certificate.courseTitle}</h5>
          <p className="text-muted small mb-3">Issued to <strong className="text-body">{studentName}</strong></p>

          <div className="bg-light dark:bg-dark p-2.5 rounded-3 mb-3 text-start small">
            <div className="d-flex justify-content-between text-muted mb-1" style={{ fontSize: '0.78rem' }}>
              <span>Completion Date:</span>
              <span className="fw-bold text-body">{certificate.issueDate}</span>
            </div>
            <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.78rem' }}>
              <span>Certificate ID:</span>
              <span className="fw-mono text-primary">{certificate.certificateId}</span>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-outline-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-1.5"
          onClick={() => {
            console.log("Certificate downloaded:", certificate.courseTitle);
            if (onDownload) onDownload(certificate);
          }}
        >
          <i className="bi bi-download"></i>
          <span>Download PDF Credential</span>
        </button>
      </div>
    </div>
  );
}

export default CertificateCard;
