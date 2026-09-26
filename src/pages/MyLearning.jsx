import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressCard from '../components/ProgressCard';

function MyLearning({ courses, enrolledCourseIds, courseProgress, completedLessons }) {
  const [filter, setFilter] = useState('all');

  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

  const filteredList = enrolledCourses.filter(c => {
    const prog = courseProgress[c.id] || 0;
    if (filter === 'completed') return prog >= 100;
    if (filter === 'inprogress') return prog < 100;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1 fs-3">My Learning Portal</h2>
          <p className="text-muted small mb-0">Continue your enrolled coursework and view milestones</p>
        </div>

        {/* Status Filter */}
        <div className="btn-group btn-group-sm">
          <button 
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => { setFilter('all'); console.log("My learning filter: All"); }}
          >
            All ({enrolledCourses.length})
          </button>
          <button 
            className={`btn ${filter === 'inprogress' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => { setFilter('inprogress'); console.log("My learning filter: In Progress"); }}
          >
            In Progress
          </button>
          <button 
            className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => { setFilter('completed'); console.log("My learning filter: Completed"); }}
          >
            Completed
          </button>
        </div>
      </div>

      {filteredList.length === 0 ? (
        <div className="card p-5 text-center border-0 shadow-sm">
          <i className="bi bi-collection-play fs-1 text-muted mb-3"></i>
          <h4 className="fw-bold mb-1">No Courses Found in this View</h4>
          <p className="text-muted small mb-3">
            {enrolledCourses.length === 0 
              ? "You haven't enrolled in any courses yet. Browse our technical catalog to get started."
              : "No courses match the selected status filter."}
          </p>
          <Link to="/courses" className="btn btn-primary btn-sm mx-auto px-4">
            Explore Courses Catalog
          </Link>
        </div>
      ) : (
        <div className="row g-3">
          {filteredList.map((course) => (
            <div key={course.id} className="col-lg-6">
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
  );
}

export default MyLearning;
