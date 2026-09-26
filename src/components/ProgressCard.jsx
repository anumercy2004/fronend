import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProgressCard({ course, progress = 0, completedLessons = 0, totalLessons = 1 }) {
  const navigate = useNavigate();

  function handleContinue() {
    console.log("Continuing learning for:", course.title);
    console.log("Course progress:", progress + "%");
    navigate(`/learning/${course.id}`);
  }

  const isCompleted = progress >= 100;

  return (
    <div className="card h-100 overflow-hidden border-0 shadow-sm">
      <div className="row g-0 align-items-center h-100">
        <div className="col-4 col-sm-3 h-100">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-100 h-100 object-fit-cover"
            style={{ minHeight: '120px' }}
          />
        </div>

        <div className="col-8 col-sm-9">
          <div className="card-body p-3">
            <div className="d-flex justify-content-between align-items-start mb-1">
              <span className="badge bg-secondary bg-opacity-10 text-secondary badge-pill small">
                {course.category}
              </span>
              <span className="badge bg-primary bg-opacity-10 text-primary small fw-mono">
                {progress}%
              </span>
            </div>

            <h6 className="card-title fw-bold mb-1 text-truncate" title={course.title}>
              {course.title}
            </h6>
            <p className="text-muted small mb-2" style={{ fontSize: '0.8rem' }}>
              Instructor: {course.instructor}
            </p>

            {/* Progress bar */}
            <div className="progress mb-2" style={{ height: '6px' }}>
              <div 
                className={`progress-bar ${isCompleted ? 'bg-success' : 'bg-primary'}`} 
                role="progressbar" 
                style={{ width: `${progress}%` }}
                aria-valuenow={progress} 
                aria-valuemin="0" 
                aria-valuemax="100"
              ></div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted small" style={{ fontSize: '0.78rem' }}>
                {completedLessons} / {totalLessons} lessons completed
              </span>

              <button 
                onClick={handleContinue}
                className={`btn btn-sm ${isCompleted ? 'btn-outline-success' : 'btn-primary'} py-1 px-3 d-flex align-items-center gap-1`}
              >
                <i className={`bi ${isCompleted ? 'bi-check-circle-fill' : 'bi-play-fill'}`}></i>
                <span>{isCompleted ? 'Review' : 'Resume'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressCard;
