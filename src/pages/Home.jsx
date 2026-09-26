import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

function Home({ 
  courses, 
  enrolledCourseIds, 
  wishlistIds, 
  onEnroll, 
  onToggleWishlist 
}) {
  const featuredCourses = courses.filter(c => c.featured).slice(0, 6);

  return (
    <div className="space-y-5">
      {/* 1. Hero Section */}
      <section className="hero-gradient p-5 mb-5 shadow-lg text-white">
        <div className="row align-items-center py-4">
          <div className="col-lg-7">
            <span className="badge bg-white text-primary rounded-pill px-3 py-1.5 fw-bold mb-3 shadow-sm">
              <i className="bi bi-stars me-1 text-warning"></i> Empower Your Future
            </span>
            <h1 className="display-4 fw-extrabold tracking-tight mb-3">
              Master In-Demand Tech Skills with <span className="text-warning">LearnSphere</span>
            </h1>
            <p className="lead text-light mb-4 opacity-90 fs-6">
              Access 20+ professional, industry-aligned courses in Web Development, Data Science, Python, Java, Cloud, and AI. Track your progress, pass interactive assessments, and claim verified certificates.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/courses" className="btn btn-warning btn-lg fw-bold text-dark px-4 py-2.5 rounded-3 shadow">
                <i className="bi bi-compass-fill me-1.5"></i> Browse All Courses
              </Link>
              <Link to="/register" className="btn btn-outline-light btn-lg fw-bold px-4 py-2.5 rounded-3">
                <i className="bi bi-person-plus-fill me-1.5"></i> Get Started Free
              </Link>
            </div>
          </div>

          <div className="col-lg-5 d-none d-lg-block text-center">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80" 
              alt="Students collaborating" 
              className="img-fluid rounded-4 shadow-lg border border-white border-opacity-25"
            />
          </div>
        </div>
      </section>

      {/* 2. Key Stats Strip */}
      <div className="row g-3 mb-5 text-center">
        {[
          { label: "Online Courses", count: "20+", icon: "bi-journal-code text-primary" },
          { label: "Active Students", count: "10,000+", icon: "bi-people-fill text-success" },
          { label: "Verified Certificates", count: "4,500+", icon: "bi-award-fill text-warning" },
          { label: "Student Rating", count: "4.8 / 5.0", icon: "bi-star-fill text-danger" }
        ].map((stat, i) => (
          <div key={i} className="col-6 col-md-3">
            <div className="card p-3 border-0 h-100 shadow-sm">
              <i className={`bi ${stat.icon} fs-2 mb-1`}></i>
              <h3 className="fw-bold mb-0 fs-4">{stat.count}</h3>
              <span className="text-muted small">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Featured Courses Section */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="fw-bold mb-1 fs-3">Featured & Trending Courses</h2>
            <p className="text-muted small mb-0">Handpicked by industry engineering leads</p>
          </div>
          <Link to="/courses" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
            <span>View All</span>
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        <div className="row g-4">
          {featuredCourses.map((course) => (
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
      </section>

      {/* 4. Why Choose LearnSphere */}
      <section className="card p-4 p-md-5 border-0 mb-5 bg-light dark:bg-dark">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <h2 className="fw-bold fs-3 mb-2">Engineered for Better Learning</h2>
          <p className="text-muted small">Every tool you need to transition from beginner to production-ready software developer.</p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="text-center p-3">
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex p-3 mb-3">
                <i className="bi bi-laptop fs-3"></i>
              </div>
              <h5 className="fw-bold fs-6">Interactive Video Curriculum</h5>
              <p className="text-muted small">Step-by-step modular lessons with progress markers, code samples, and instant playback.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="text-center p-3">
              <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex p-3 mb-3">
                <i className="bi bi-patch-question-fill fs-3"></i>
              </div>
              <h5 className="fw-bold fs-6">Knowledge Quizzes</h5>
              <p className="text-muted small">Test what you learn with timed multiple-choice assessments and detailed answer reviews.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="text-center p-3">
              <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-inline-flex p-3 mb-3">
                <i className="bi bi-award fs-3"></i>
              </div>
              <h5 className="fw-bold fs-6">Accredited Certificates</h5>
              <p className="text-muted small">Receive verifiable completion credentials to showcase on LinkedIn, GitHub, and resumes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
