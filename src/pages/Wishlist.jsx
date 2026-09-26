import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

function Wishlist({ 
  courses, 
  wishlistIds, 
  enrolledCourseIds, 
  onEnroll, 
  onToggleWishlist 
}) {
  const wishlistedCourses = courses.filter(c => wishlistIds.includes(c.id));

  return (
    <div className="space-y-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1 fs-3">Saved Courses Wishlist</h2>
          <p className="text-muted small mb-0">Courses you have bookmarked to enroll in later</p>
        </div>
        <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-1.5 fw-bold">
          <i className="bi bi-heart-fill me-1"></i> {wishlistedCourses.length} Saved
        </span>
      </div>

      {wishlistedCourses.length === 0 ? (
        <div className="card p-5 text-center border-0 shadow-sm">
          <i className="bi bi-heartbreak fs-1 text-muted mb-3"></i>
          <h4 className="fw-bold mb-1">Your Wishlist is Empty</h4>
          <p className="text-muted small mb-3">
            Explore our curriculum and click the heart icon on any course card to bookmark it here.
          </p>
          <Link to="/courses" className="btn btn-primary btn-sm mx-auto px-4">
            Discover Courses
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {wishlistedCourses.map((course) => (
            <div key={course.id} className="col-md-6 col-lg-4">
              <CourseCard
                course={course}
                isEnrolled={enrolledCourseIds.includes(course.id)}
                isWishlisted={true}
                onEnroll={onEnroll}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
