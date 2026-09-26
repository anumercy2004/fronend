import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function Learning({ 
  courses, 
  completedLessons, 
  onCompleteLesson, 
  onClaimCertificate, 
  certificates 
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === parseInt(id, 10));

  if (!course) {
    return (
      <div className="container py-5 text-center">
        <h4>Course not found</h4>
        <Link to="/courses" className="btn btn-primary btn-sm mt-3">Back to Courses</Link>
      </div>
    );
  }

  // Get syllabus
  const lessons = course.syllabus || [
    { id: 1, title: `${course.title} - Module 1: Core Fundamentals`, duration: "25 mins" },
    { id: 2, title: `${course.title} - Module 2: Applied Architecture`, duration: "35 mins" },
    { id: 3, title: `${course.title} - Module 3: Hands-on Implementation`, duration: "45 mins" },
    { id: 4, title: `${course.title} - Module 4: Testing & Deployment`, duration: "30 mins" }
  ];

  const courseCompletedList = completedLessons[course.id] || [];
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const currentLesson = lessons[currentLessonIndex] || lessons[0];

  const progressPercent = Math.round((courseCompletedList.length / lessons.length) * 100);
  const isLessonCompleted = courseCompletedList.includes(currentLesson.id);
  const isAllCompleted = courseCompletedList.length >= lessons.length;
  const hasCertificate = certificates.some(c => c.courseId === course.id);

  function handleToggleComplete() {
    onCompleteLesson(course.id, currentLesson.id);
    console.log("Lesson completed:", currentLesson.title);
    const updatedCount = isLessonCompleted ? courseCompletedList.length - 1 : courseCompletedList.length + 1;
    const newProgress = Math.round((updatedCount / lessons.length) * 100);
    console.log("Course progress:", newProgress + "%");
  }

  function handleNextLesson() {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      console.log("Next lesson opened:", lessons[currentLessonIndex + 1].title);
    }
  }

  function handlePrevLesson() {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
      console.log("Previous lesson opened:", lessons[currentLessonIndex - 1].title);
    }
  }

  function handleClaimCertificate() {
    onClaimCertificate(course);
    console.log("Claimed certificate for course:", course.title);
    navigate('/certificates');
  }

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb and Progress Header */}
      <div className="card p-3 border-0 shadow-sm mb-3">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <Link to="/my-learning" className="text-muted small text-decoration-none d-flex align-items-center gap-1 mb-1">
              <i className="bi bi-arrow-left"></i> My Learning Portal
            </Link>
            <h4 className="fw-bold fs-6 mb-0 text-truncate">{course.title}</h4>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="text-end">
              <span className="small fw-bold text-primary">{progressPercent}% Completed</span>
              <div className="progress mt-1" style={{ width: '140px', height: '6px' }}>
                <div 
                  className={`progress-bar ${isAllCompleted ? 'bg-success' : 'bg-primary'}`} 
                  role="progressbar" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {isAllCompleted && (
              <button 
                onClick={handleClaimCertificate}
                className="btn btn-warning btn-sm fw-bold text-dark d-flex align-items-center gap-1 shadow-sm"
              >
                <i className="bi bi-award-fill"></i>
                <span>{hasCertificate ? 'View Certificate' : 'Claim Certificate'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Video Player & Controls */}
        <div className="col-lg-8">
          {/* Simulated Video Player Screen */}
          <div className="card border-0 shadow-sm overflow-hidden mb-3 bg-black">
            <div className="position-relative d-flex align-items-center justify-content-center" style={{ minHeight: '380px' }}>
              <img 
                src={course.image} 
                alt={currentLesson.title}
                className="w-100 h-100 object-fit-cover opacity-40 position-absolute"
                style={{ filter: 'brightness(0.6)' }}
              />

              <div className="position-relative text-center p-4 text-white z-1">
                <div className="bg-primary rounded-circle p-3 d-inline-flex align-items-center justify-content-center shadow-lg mb-3 cursor-pointer">
                  <i className="bi bi-play-fill fs-2 text-white"></i>
                </div>
                <h5 className="fw-bold mb-1">{currentLesson.title}</h5>
                <p className="text-light opacity-75 small mb-0">Video Duration: {currentLesson.duration} · High Definition 1080p</p>
              </div>

              {/* Player Bottom Control Bar */}
              <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-to-t bg-dark bg-opacity-75 d-flex justify-content-between align-items-center text-white small">
                <div className="d-flex align-items-center gap-3">
                  <i className="bi bi-play-circle fs-5 cursor-pointer"></i>
                  <i className="bi bi-volume-up fs-5 cursor-pointer"></i>
                  <span>04:12 / {currentLesson.duration}</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="badge bg-secondary badge-pill">1080p HD</span>
                  <i className="bi bi-fullscreen fs-5 cursor-pointer"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Action Controls */}
          <div className="card p-3.5 border-0 shadow-sm mb-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div className="d-flex gap-2">
                <button 
                  onClick={handlePrevLesson}
                  disabled={currentLessonIndex === 0}
                  className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                >
                  <i className="bi bi-arrow-left"></i> Previous
                </button>
                <button 
                  onClick={handleNextLesson}
                  disabled={currentLessonIndex === lessons.length - 1}
                  className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                >
                  Next <i className="bi bi-arrow-right"></i>
                </button>
              </div>

              <div className="d-flex gap-2">
                <button 
                  onClick={handleToggleComplete}
                  className={`btn btn-sm d-flex align-items-center gap-1.5 ${
                    isLessonCompleted ? 'btn-success' : 'btn-outline-success'
                  }`}
                >
                  <i className={`bi ${isLessonCompleted ? 'bi-check-circle-fill' : 'bi-circle'}`}></i>
                  <span>{isLessonCompleted ? 'Completed ✓' : 'Mark as Completed'}</span>
                </button>

                <Link to="/quizzes" className="btn btn-primary btn-sm d-flex align-items-center gap-1">
                  <i className="bi bi-patch-question"></i> Take Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Lesson Syllabus Playlist */}
        <div className="col-lg-4">
          <div className="card p-3.5 border-0 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold fs-6 mb-0">Course Curriculum</h5>
              <span className="badge bg-primary bg-opacity-10 text-primary small">
                {courseCompletedList.length} / {lessons.length} Done
              </span>
            </div>

            <div className="list-group list-group-flush overflow-y-auto" style={{ maxHeight: '480px' }}>
              {lessons.map((lesson, idx) => {
                const isSelected = idx === currentLessonIndex;
                const isDone = courseCompletedList.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setCurrentLessonIndex(idx);
                      console.log("Switched to lesson:", lesson.title);
                    }}
                    className={`list-group-item list-group-item-action text-start p-3 border-bottom d-flex align-items-center justify-content-between ${
                      isSelected ? 'bg-primary bg-opacity-10 border-primary text-primary fw-bold' : ''
                    }`}
                  >
                    <div className="d-flex align-items-center gap-2.5 min-w-0">
                      <i className={`bi ${isDone ? 'bi-check-circle-fill text-success' : 'bi-circle text-muted'} fs-5 shrink-0`}></i>
                      <div className="min-w-0">
                        <span className="small d-block text-truncate" title={lesson.title}>
                          {idx + 1}. {lesson.title}
                        </span>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>{lesson.duration}</span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="badge bg-primary badge-pill small ms-2">Now Playing</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learning;
