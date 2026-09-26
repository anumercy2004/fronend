import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CertificateCard from '../components/CertificateCard';

function Certificates({ certificates, studentName }) {
  const [selectedCert, setSelectedCert] = useState(null);

  function handleDownload(cert) {
    setSelectedCert(cert);
    console.log("Certificate viewed in full credential mode:", cert.courseTitle);
  }

  return (
    <div className="space-y-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1 fs-3">Earned Certificates</h2>
          <p className="text-muted small mb-0">Official verifiable credentials for finished coursework</p>
        </div>
        <span className="badge bg-warning bg-opacity-10 text-warning rounded-pill px-3 py-1.5 fw-bold">
          <i className="bi bi-award-fill me-1"></i> {certificates.length} Credentials
        </span>
      </div>

      {certificates.length === 0 ? (
        <div className="card p-5 text-center border-0 shadow-sm">
          <i className="bi bi-award fs-1 text-muted mb-3"></i>
          <h4 className="fw-bold mb-1">No Certificates Earned Yet</h4>
          <p className="text-muted small mb-3">
            Complete 100% of any enrolled course syllabus to generate your verifiable certificate of achievement.
          </p>
          <Link to="/my-learning" className="btn btn-primary btn-sm mx-auto px-4">
            Resume Coursework
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="col-md-6 col-lg-4">
              <CertificateCard
                certificate={cert}
                studentName={studentName}
                onDownload={handleDownload}
              />
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal Fullscreen Preview */}
      {selectedCert && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center p-3"
          style={{ zIndex: 1060 }}
        >
          <div className="card border-0 shadow-2xl p-4 p-md-5 max-w-3xl w-100 position-relative" style={{ maxWidth: '750px', backgroundColor: '#fffdf5', color: '#1e293b' }}>
            <button
              onClick={() => setSelectedCert(null)}
              className="btn btn-sm btn-close position-absolute top-0 end-0 m-3"
              aria-label="Close"
            ></button>

            {/* Formal Certificate Frame */}
            <div className="text-center border p-4 p-md-5 rounded-3 position-relative" style={{ borderColor: '#d97706', borderWidth: '4px' }}>
              <div className="mb-2">
                <i className="bi bi-mortarboard-fill fs-1 text-primary"></i>
              </div>
              <h2 className="fw-bold tracking-tight text-uppercase mb-1" style={{ letterSpacing: '0.1em', color: '#1e293b' }}>
                Certificate of Completion
              </h2>
              <p className="text-muted small fst-italic mb-4">This acknowledges that</p>

              <h3 className="fw-extrabold text-primary border-bottom d-inline-block pb-2 px-4 mb-3">
                {studentName}
              </h3>

              <p className="text-muted small mb-1">has successfully completed the comprehensive curriculum for</p>
              <h4 className="fw-bold text-dark mb-4">{selectedCert.courseTitle}</h4>

              <div className="row g-3 align-items-end mt-4 pt-3 border-top">
                <div className="col-6 text-start">
                  <span className="small text-muted d-block">Issued Date: <strong>{selectedCert.issueDate}</strong></span>
                  <span className="small text-muted d-block">Credential ID: <strong className="font-mono">{selectedCert.certificateId}</strong></span>
                </div>
                <div className="col-6 text-end">
                  <div className="d-inline-flex flex-column align-items-center">
                    <span className="badge bg-warning text-dark p-2 rounded-circle mb-1 shadow-sm">
                      <i className="bi bi-patch-check-fill fs-4"></i>
                    </span>
                    <span className="small fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>Official LearnSphere Seal</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-3 d-flex justify-content-center gap-2">
              <button 
                onClick={() => {
                  window.print();
                  console.log("Certificate printed/downloaded");
                }}
                className="btn btn-primary btn-sm px-4 fw-bold"
              >
                <i className="bi bi-printer me-1"></i> Print / Save as PDF
              </button>
              <button 
                onClick={() => setSelectedCert(null)}
                className="btn btn-outline-secondary btn-sm px-3"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Certificates;
