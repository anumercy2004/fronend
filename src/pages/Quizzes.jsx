import React from 'react';
import QuizCard from '../components/QuizCard';

function Quizzes({ quizzes, courses, quizScores }) {
  return (
    <div className="space-y-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1 fs-3">Interactive Skill Assessments</h2>
          <p className="text-muted small mb-0">Evaluate your technical comprehension and earn passing benchmarks</p>
        </div>
        <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1.5 fw-bold">
          <i className="bi bi-patch-question-fill me-1"></i> {quizzes.length} Available Quizzes
        </span>
      </div>

      <div className="row g-4">
        {quizzes.map((quiz) => {
          const course = courses.find(c => c.id === quiz.courseId);
          const score = quizScores[quiz.id];

          return (
            <div key={quiz.id} className="col-md-6 col-lg-4">
              <QuizCard
                quiz={quiz}
                courseName={course?.title || "Technical Fundamentals"}
                previousScore={score}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Quizzes;
