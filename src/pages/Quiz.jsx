import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function Quiz({ quizzes, onSaveScore }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const quiz = quizzes.find((q) => q.id === parseInt(id, 10));

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  if (!quiz) {
    return (
      <div className="container py-5 text-center">
        <h4>Quiz Assessment Not Found</h4>
        <Link to="/quizzes" className="btn btn-primary btn-sm mt-3">Back to Quizzes</Link>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQIndex];
  const totalQuestions = quiz.questions.length;

  function handleSelectOption(optIndex) {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQIndex]: optIndex
    }));
  }

  function handleNext() {
    if (currentQIndex < totalQuestions - 1) {
      setCurrentQIndex(prev => prev + 1);
    }
  }

  function handlePrev() {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
    }
  }

  function handleSubmit() {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const calculatedPercentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = calculatedPercentage >= quiz.passingScore;

    setScoreResult({
      correct: correctCount,
      total: totalQuestions,
      percentage: calculatedPercentage,
      passed
    });

    setIsSubmitted(true);
    onSaveScore(quiz.id, calculatedPercentage);
    console.log("Quiz submitted. Score:", `${correctCount}/${totalQuestions} (${calculatedPercentage}%)`);
  }

  function handleRetake() {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setIsSubmitted(false);
    setScoreResult(null);
    console.log("Retaking quiz assessment:", quiz.title);
  }

  return (
    <div className="container max-w-3xl py-3" style={{ maxWidth: '800px' }}>
      {/* Header */}
      <div className="card p-3 border-0 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Link to="/quizzes" className="text-muted small text-decoration-none d-flex align-items-center gap-1 mb-1">
              <i className="bi bi-arrow-left"></i> All Assessments
            </Link>
            <h4 className="fw-bold fs-6 mb-0">{quiz.title}</h4>
          </div>
          <span className="badge bg-primary bg-opacity-10 text-primary small">
            Pass Mark: {quiz.passingScore}%
          </span>
        </div>
      </div>

      {!isSubmitted ? (
        <div className="card p-4 p-md-5 border-0 shadow-sm mb-4">
          {/* Progress indicators */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="small text-muted fw-semibold">
              Question {currentQIndex + 1} of {totalQuestions}
            </span>
            <span className="small text-muted font-mono">
              Answered: {Object.keys(selectedAnswers).length} / {totalQuestions}
            </span>
          </div>

          <div className="progress mb-4" style={{ height: '6px' }}>
            <div 
              className="progress-bar bg-primary" 
              role="progressbar" 
              style={{ width: `${((currentQIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>

          {/* Question Text */}
          <h5 className="fw-bold fs-5 mb-4 text-body leading-relaxed">
            {currentQuestion.question}
          </h5>

          {/* 4 Options */}
          <div className="d-flex flex-column gap-2.5 mb-5">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQIndex] === optIdx;

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`btn text-start p-3 rounded-3 d-flex align-items-center gap-3 transition-all ${
                    isSelected 
                      ? 'btn-primary shadow-sm text-white' 
                      : 'btn-outline-secondary text-body'
                  }`}
                >
                  <span className={`badge rounded-circle p-2 d-flex align-items-center justify-content-center ${
                    isSelected ? 'bg-white text-primary' : 'bg-light text-dark'
                  }`} style={{ width: 28, height: 28 }}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="small fw-semibold">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation */}
          <div className="d-flex justify-content-between align-items-center pt-3 border-top">
            <button
              onClick={handlePrev}
              disabled={currentQIndex === 0}
              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            >
              <i className="bi bi-arrow-left"></i> Previous
            </button>

            <div className="d-flex gap-2">
              {currentQIndex < totalQuestions - 1 ? (
                <button
                  onClick={handleNext}
                  className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                >
                  Next <i className="bi bi-arrow-right"></i>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="btn btn-success btn-sm d-flex align-items-center gap-1 fw-bold"
                >
                  <i className="bi bi-check-all"></i> Submit Assessment
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results & Review View */
        <div className="card p-4 p-md-5 border-0 shadow-sm text-center mb-4">
          <div className="mb-3">
            <div className={`rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-2 ${
              scoreResult.passed ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'
            }`} style={{ width: 72, height: 72 }}>
              <i className={`bi ${scoreResult.passed ? 'bi-trophy-fill' : 'bi-exclamation-circle-fill'} fs-1`}></i>
            </div>
          </div>

          <h3 className="fw-bold mb-1">
            {scoreResult.passed ? "Assessment Passed!" : "Needs Improvement"}
          </h3>
          <p className="text-muted small mb-4">
            You scored <strong className="text-body fs-5">{scoreResult.percentage}%</strong> ({scoreResult.correct} out of {scoreResult.total} questions correct).
          </p>

          <div className="d-flex justify-content-center gap-2 mb-5">
            <button onClick={handleRetake} className="btn btn-outline-primary btn-sm px-4">
              <i className="bi bi-arrow-counterclockwise me-1"></i> Retake Quiz
            </button>
            <Link to="/quizzes" className="btn btn-primary btn-sm px-4">
              Back to Quizzes List
            </Link>
          </div>

          {/* Question Explanations */}
          <div className="text-start border-top pt-4">
            <h5 className="fw-bold fs-6 mb-3">Detailed Answer Key & Explanations:</h5>
            <div className="d-flex flex-column gap-3">
              {quiz.questions.map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div key={q.id} className="p-3 rounded-3 border bg-light dark:bg-dark">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold small">{idx + 1}. {q.question}</span>
                      <span className={`badge ${isCorrect ? 'bg-success' : 'bg-danger'} small`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <p className="small text-muted mb-1">
                      Your answer: <strong>{userChoice !== undefined ? q.options[userChoice] : "None"}</strong>
                    </p>
                    <p className="small text-success mb-2">
                      Correct answer: <strong>{q.options[q.correctIndex]}</strong>
                    </p>
                    <p className="small text-muted fst-italic mb-0 bg-white dark:bg-black p-2 rounded border" style={{ fontSize: '0.8rem' }}>
                      💡 {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
