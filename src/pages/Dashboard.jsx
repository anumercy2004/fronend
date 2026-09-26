import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProgressCard from '../components/ProgressCard';
import CourseCard from '../components/CourseCard';

function Dashboard({ 
  user, 
  courses, 
  enrolledCourseIds, 
  courseProgress, 
  completedLessons, 
  certificates, 
  wishlistIds, 
  onEnroll, 
  onToggleWishlist 
}) {
  const navigate = useNavigate();

  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));
  const completedCoursesCount = enrolledCourses.filter(c => (courseProgress[c.id] || 0) >= 100).length;

  const totalProgressSum = enrolledCourses.reduce((acc, c) => acc + (courseProgress[c.id] || 0), 0);
  const avgProgress = enrolledCourses.length > 0 ? Math.round(totalProgressSum / enrolledCourses.length) : 0;

  const recommendedCourses = courses.filter(c => !enrolledCourseIds.includes(c.id)).slice(0, 3);

  return (
    <div className="space-y-4">
      {/* 1. Welcome Banner */}
      <div className="card p-4 p-md-5 border-0 hero-gradient text-white mb-4 shadow">
        <div className="row align-items-center">
          <div className="col-md-8">
            <span className="badge bg-white text-primary rounded-pill px-3 py-1 fw-bold mb-2">
              <i className="bi bi-person-check-fill me-1"></i> Student Learning Portal
            </span>
            <h2 className="fw-extrabold display-6 mb-2">
              Welcome back, {user?.name || "Student"}!
            </h2>
            <p className="text-light opacity-90 small mb-4">
              Track your syllabus milestones, take interactive chapter assessments, and download your accredited certificates.
            </p>
            <div className="d-flex flex-wrap gap-2.5">
              <Link to="/courses" className="btn btn-warning text-dark fw-bold btn-sm px-3 py-2 rounded-3">
                <i className="bi bi-plus-circle me-1"></i> Enroll in New Course
              </Link>
              <Link to="/quizzes" className="btn btn-outline-light btn-sm px-3 py-2 rounded-3">
                <i className="bi bi-patch-question me-1"></i> Take a Quiz
              </Link>
            </div>
          </div>
          <div className="col-md-4 d-none d-md-block text-end">
            <i className="bi bi-mortarboard fs-1 text-white opacity-25" style={{ fontSize: '6rem' }}></i>
          </div>
        </div>
      </div>

      {/* 2. Overview Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="card p-3 border-0 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-muted small">Enrolled</span>
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 34, height: 34 }}>
                <i className="bi bi-book-half"></i>
              </div>
            </div>
            <h3 className="fw-bold mb-0 fs-4">{enrolledCourses.length}</h3>
            <span className="text-muted small" style={{ fontSize: '0.78rem' }}>Active courses</span>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card p-3 border-0 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-muted small">Completed</span>
              <div className="bg-success bg-opacity-10 text-success rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 34, height: 34 }}>
                <i className="bi bi-check2-circle"></i>
              </div>
            </div>
            <h3 className="fw-bold mb-0 fs-4">{completedCoursesCount}</h3>
            <span className="text-muted small" style={{ fontSize: '0.78rem' }}>Finished courses</span>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card p-3 border-0 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-muted small">Avg Progress</span>
              <div className="bg-info bg-opacity-10 text-info rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 34, height: 34 }}>
                <i className="bi bi-speedometer2"></i>
              </div>
            </div>
            <h3 className="fw-bold mb-0 fs-4">{avgProgress}%</h3>
            <span className="text-muted small" style={{ fontSize: '0.78rem' }}>Overall syllabus</span>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card p-3 border-0 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-muted small">Certificates</span>
              <div className="bg-warning bg-opacity-10 text-warning rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 34, height: 34 }}>
                <i className="bi bi-award-fill"></i>
              </div>
            </div>
            <h3 className="fw-bold mb-0 fs-4">{certificates.length}</h3>
            <span className="text-muted small" style={{ fontSize: '0.78rem' }}>Earned credentials</span>
          </div>
        </div>
      </div>

      {/* 3. In-Progress Learning Courses */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold fs-5 mb-0">Continue Your Learning</h4>
          <Link to="/my-learning" className="text-primary small fw-semibold text-decoration-none">
            View All ({enrolledCourses.length})
          </Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="card p-5 text-center border-0 shadow-sm">
            <i className="bi bi-journal-bookmark fs-1 text-muted mb-2"></i>
            <h5 className="fw-bold mb-1">No Active Enrollments</h5>
            <p className="text-muted small mb-3">Browse our 20+ courses and start your journey today.</p>
            <Link to="/courses" className="btn btn-primary btn-sm mx-auto px-4">
              Explore Courses Catalog
            </Link>
          </div>
        ) : (
          <div className="row g-3">
            {enrolledCourses.slice(0, 4).map((course) => (
              <div key={course.id} className="col-md-6">
                <ProgressCard
                  course={course}
                  progress={courseProgress[course.id] || 0}
                  completedLessons={(completedLessons[course.id] || []).length}
                  totalLessons={course.syllabus ? course.syllabus.length : course.lessons}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Recommended Courses Section */}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold fs-5 mb-0">Recommended for You</h4>
          <Link to="/courses" className="text-primary small fw-semibold text-decoration-none">
            Explore All Catalog
          </Link>
        </div>

        <div className="row g-4">
          {recommendedCourses.map((course) => (
            <div key={course.id} className="col-md-6 col-lg-4">
              <CourseCard
                course={course}
                isEnrolled={enrolledCourseIds.includes(course.id)}
                isWishlisted={wishlistIds.includes(course.id)}
                onEnroll={onEnroll}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
