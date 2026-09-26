import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CourseCard({ 
  course, 
  isEnrolled, 
  isWishlisted, 
  onEnroll, 
  onToggleWishlist 
}) {
  const navigate = useNavigate();

  function handleEnrollClick(e) {
    e.stopPropagation();
    onEnroll(course);
    console.log("Course enrolled:", course.title);
  }

  function handleWishlistClick(e) {
    e.stopPropagation();
    onToggleWishlist(course);
    if (!isWishlisted) {
      console.log("Course added to wishlist:", course.title);
    } else {
      console.log("Course removed from wishlist:", course.title);
    }
  }

  function handleCardClick() {
    console.log("Navigating to course details:", course.title);
    navigate(`/courses/${course.id}`);
  }

  return (
    <div 
      className="card h-100 overflow-hidden cursor-pointer position-relative"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Course Image & Badges */}
      <div className="position-relative overflow-hidden" style={{ height: '175px' }}>
        <img 
          src={course.image} 
          alt={course.title}
          className="w-100 h-100 object-fit-cover"
          loading="lazy"
        />

        {/* Category Pill */}
        <span 
          className="badge bg-dark bg-opacity-75 position-absolute top-0 start-0 m-2.5 badge-pill backdrop-blur"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          {course.category}
        </span>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="btn btn-sm btn-light rounded-circle position-absolute top-0 end-0 m-2.5 d-flex align-items-center justify-content-center shadow-sm"
          style={{ width: 34, height: 34 }}
          title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
          aria-label="Wishlist toggle"
        >
          <i className={`bi ${isWishlisted ? 'bi-heart-fill text-danger' : 'bi-heart text-secondary'}`}></i>
        </button>

        {/* Level Badge */}
        <span className="badge bg-primary position-absolute bottom-0 start-0 m-2.5 badge-pill">
          {course.level}
        </span>
      </div>

      {/* Body Content */}
      <div className="card-body d-flex flex-column justify-content-between p-3.5">
        <div>
          {/* Rating & Review */}
          <div className="d-flex align-items-center gap-1.5 mb-2 small">
            <span className="text-warning fw-bold d-flex align-items-center">
              <i className="bi bi-star-fill me-1"></i>
              {course.rating}
            </span>
            <span className="text-muted" style={{ fontSize: '0.78rem' }}>
              ({course.reviewsCount?.toLocaleString() || 500} reviews)
            </span>
          </div>

          <h5 className="card-title fw-bold fs-6 mb-2 text-truncate-2" title={course.title}>
            {course.title}
          </h5>

          <p className="text-muted small mb-2 d-flex align-items-center gap-1">
            <i className="bi bi-person text-primary"></i>
            <span>{course.instructor}</span>
          </p>

          <p className="card-text text-muted small mb-3 text-truncate-2" style={{ fontSize: '0.82rem' }}>
            {course.description}
          </p>
        </div>

        <div>
          {/* Metadata Row: Duration & Lessons */}
          <div className="d-flex align-items-center justify-content-between text-muted small pt-2 mb-3 border-top" style={{ fontSize: '0.8rem' }}>
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-clock"></i>
              {course.duration}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-journal-text"></i>
              {course.lessons} Lessons
            </span>
          </div>

          {/* Pricing & CTA */}
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <span className="fs-5 fw-bold text-primary">₹{course.price}</span>
              {course.originalPrice && (
                <span className="text-decoration-line-through text-muted small ms-2">
                  ₹{course.originalPrice}
                </span>
              )}
            </div>

            {isEnrolled ? (
              <button 
                className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Resuming learning for enrolled course:", course.title);
                  navigate(`/learning/${course.id}`);
                }}
              >
                <i className="bi bi-play-circle-fill"></i> Continue
              </button>
            ) : (
              <button 
                className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                onClick={handleEnrollClick}
              >
                <i className="bi bi-bag-plus-fill"></i> Enroll
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
