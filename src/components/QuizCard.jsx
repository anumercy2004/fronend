import React from 'react';
import { useNavigate } from 'react-router-dom';

function QuizCard({ quiz, courseName, previousScore }) {
  const navigate = useNavigate();

  function handleStartQuiz() {
    console.log("Navigating to quiz assessment:", quiz.title);
    navigate(`/quiz/${quiz.id}`);
  }

  const isCompleted = previousScore !== undefined && previousScore !== null;
  const isPassed = isCompleted && (previousScore >= quiz.passingScore);

  return (
    <div className="card h-100 border-0 shadow-sm p-3.5 d-flex flex-column justify-content-between">
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-primary bg-opacity-10 text-primary badge-pill">
            <i className="bi bi-clock me-1"></i> {quiz.duration}
          </span>
          {isCompleted && (
            <span className={`badge ${isPassed ? 'bg-success' : 'bg-warning text-dark'} badge-pill`}>
              Score: {previousScore}%
            </span>
          )}
        </div>

        <h5 className="card-title fw-bold fs-6 mb-1">{quiz.title}</h5>
        <p className="text-muted small mb-3">
          Course: <span className="text-body fw-semibold">{courseName || "General Course"}</span>
        </p>

        <div className="d-flex align-items-center gap-3 text-muted small mb-3" style={{ fontSize: '0.82rem' }}>
          <span><i className="bi bi-question-circle me-1 text-primary"></i>{quiz.questions.length} Questions</span>
          <span><i className="bi bi-bullseye me-1 text-success"></i>Pass Mark: {quiz.passingScore}%</span>
        </div>
      </div>

      <div className="pt-2 border-top">
        <button 
          onClick={handleStartQuiz}
          className={`btn ${isCompleted ? 'btn-outline-primary' : 'btn-primary'} btn-sm w-100 d-flex align-items-center justify-content-center gap-1.5`}
        >
          <i className="bi bi-pencil-square"></i>
          <span>{isCompleted ? 'Retake Quiz' : 'Start Assessment'}</span>
        </button>
      </div>
    </div>
  );
}

export default QuizCard;
