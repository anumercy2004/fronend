import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function CourseDetails({ 
  courses, 
  enrolledCourseIds, 
  wishlistIds, 
  onEnroll, 
  onToggleWishlist 
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === parseInt(id, 10));

  if (!course) {
    return (
      <div className="container py-5 text-center">
        <h4 className="fw-bold mb-2">Course Not Found</h4>
        <p className="text-muted small mb-3">The requested course could not be located in our catalog.</p>
        <Link to="/courses" className="btn btn-primary btn-sm">
          Return to Courses
        </Link>
      </div>
    );
  }

  const isEnrolled = enrolledCourseIds.includes(course.id);
  const isWishlisted = wishlistIds.includes(course.id);

  function handleEnroll() {
    onEnroll(course);
    console.log("Course enrolled:", course.title);
  }

  function handleWishlist() {
    onToggleWishlist(course);
    if (!isWishlisted) {
      console.log("Course added to wishlist:", course.title);
    } else {
      console.log("Course removed from wishlist:", course.title);
    }
  }

  function handleStartLearning() {
    console.log("Navigating to interactive lesson viewer:", course.title);
    navigate(`/learning/${course.id}`);
  }

  return (
    <div className="space-y-4">
      {/* Back button */}
      <div className="mb-3">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-link text-decoration-none p-0 text-muted small d-inline-flex align-items-center gap-1"
        >
          <i className="bi bi-arrow-left"></i> Back to Courses
        </button>
      </div>

      {/* Top Hero Card */}
      <div className="card p-4 p-md-5 border-0 bg-dark text-white mb-4 shadow position-relative overflow-hidden">
        <div className="row align-items-center g-4">
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-primary rounded-pill small px-3 py-1">
                {course.category}
              </span>
              <span className="badge bg-secondary bg-opacity-50 rounded-pill small px-2.5 py-1">
                {course.level}
              </span>
            </div>

            <h1 className="fw-bold mb-3 fs-2">{course.title}</h1>
            <p className="text-light opacity-90 small mb-4 lead fs-6">
              {course.description}
            </p>

            <div className="d-flex flex-wrap align-items-center gap-4 text-light small opacity-80 mb-4">
              <span className="d-flex align-items-center gap-1">
                <i className="bi bi-star-fill text-warning"></i>
                <strong className="text-white">{course.rating}</strong> ({course.reviewsCount} reviews)
              </span>
              <span className="d-flex align-items-center gap-1">
                <i className="bi bi-clock"></i> {course.duration}
              </span>
              <span className="d-flex align-items-center gap-1">
                <i className="bi bi-person"></i> Instructor: {course.instructor}
              </span>
              <span className="d-flex align-items-center gap-1">
                <i className="bi bi-journal-text"></i> {course.lessons} Lessons
              </span>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-3">
              {isEnrolled ? (
                <button 
                  onClick={handleStartLearning}
                  className="btn btn-success btn-lg px-4 py-2.5 fw-bold d-flex align-items-center gap-2"
                >
                  <i className="bi bi-play-circle-fill fs-5"></i>
                  <span>Go to Learning Area</span>
                </button>
              ) : (
                <button 
                  onClick={handleEnroll}
                  className="btn btn-primary btn-lg px-4 py-2.5 fw-bold d-flex align-items-center gap-2"
                >
                  <i className="bi bi-bag-plus-fill fs-5"></i>
                  <span>Enroll Now for ₹{course.price}</span>
                </button>
              )}

              <button 
                onClick={handleWishlist}
                className={`btn btn-outline-light btn-lg px-3 py-2.5 d-flex align-items-center gap-1.5 ${
                  isWishlisted ? 'text-danger border-danger' : ''
                }`}
                title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
              >
                <i className={`bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>
          </div>

          <div className="col-lg-4 text-center">
            <img 
              src={course.image} 
              alt={course.title} 
              className="img-fluid rounded-4 shadow-lg border border-secondary border-opacity-50"
              style={{ maxHeight: '250px', objectFit: 'cover', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Curriculum & Key Objectives */}
      <div className="row g-4">
        {/* Left: Syllabus */}
        <div className="col-lg-8">
          <div className="card p-4 border-0 shadow-sm mb-4">
            <h4 className="fw-bold fs-5 mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-list-check text-primary"></i>
              <span>Course Syllabus & Modules</span>
            </h4>

            <div className="list-group list-group-flush">
              {course.syllabus ? (
                course.syllabus.map((lesson, idx) => (
                  <div 
                    key={lesson.id} 
                    className="list-group-item d-flex justify-content-between align-items-center py-3 px-0 border-bottom"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span className="badge bg-light text-dark rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 28, height: 28 }}>
                        {idx + 1}
                      </span>
                      <span className="fw-semibold small text-body">{lesson.title}</span>
                    </div>
                    <span className="text-muted small">{lesson.duration}</span>
                  </div>
                ))
              ) : (
                <p className="text-muted small py-3">Comprehensive 20+ video module breakdown available inside the learning portal.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right: Instructor & Perks */}
        <div className="col-lg-4">
          <div className="card p-4 border-0 shadow-sm mb-4">
            <h5 className="fw-bold fs-6 mb-3">Course Includes:</h5>
            <ul className="list-unstyled small space-y-2 mb-0">
              <li className="d-flex align-items-center gap-2 mb-2 text-muted">
                <i className="bi bi-film text-primary"></i> 24+ Hours On-Demand Video
              </li>
              <li className="d-flex align-items-center gap-2 mb-2 text-muted">
                <i className="bi bi-file-code text-primary"></i> Full Source Code Repository
              </li>
              <li className="d-flex align-items-center gap-2 mb-2 text-muted">
                <i className="bi bi-patch-question text-primary"></i> Interactive Chapter Quizzes
              </li>
              <li className="d-flex align-items-center gap-2 mb-2 text-muted">
                <i className="bi bi-award text-success"></i> Verifiable Certificate of Completion
              </li>
              <li className="d-flex align-items-center gap-2 text-muted">
                <i className="bi bi-phone text-primary"></i> Mobile, Tablet & Desktop Access
              </li>
            </ul>
          </div>

          <div className="card p-4 border-0 shadow-sm">
            <h5 className="fw-bold fs-6 mb-2">Lead Instructor</h5>
            <div className="d-flex align-items-center gap-3 mb-2">
              <div className="bg-primary text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
                <i className="bi bi-person-fill fs-5"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-0">{course.instructor}</h6>
                <span className="text-muted small">Senior Software Engineer</span>
              </div>
            </div>
            <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>
              Over 10+ years designing enterprise architectures and teaching thousands of junior developers worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
