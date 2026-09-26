import React, { useState, useMemo } from 'react';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';
import CourseFilter from '../components/CourseFilter';

function Courses({ 
  courses, 
  enrolledCourseIds, 
  wishlistIds, 
  onEnroll, 
  onToggleWishlist 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('featured');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(courses.map(c => c.category));
    return ['All', ...Array.from(set)];
  }, [courses]);

  // Filtering & Sorting
  const filteredCourses = useMemo(() => {
    const list = courses.filter((c) => {
      // Search
      const matchesSearch = 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.category.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      // Category
      if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;

      // Level
      if (selectedLevel !== 'All Levels' && c.level !== selectedLevel) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured/default
    });

    console.log("Filtered courses:", list.length);
    return list;
  }, [courses, searchTerm, selectedCategory, selectedLevel, sortBy]);

  function handleResetFilters() {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All Levels');
    setSortBy('featured');
    console.log("All course search filters reset");
  }

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="card p-4 p-md-5 border-0 bg-primary text-white mb-4 shadow-sm" style={{ borderRadius: '1.25rem' }}>
        <h2 className="fw-bold mb-2">Explore 20+ Technical Courses</h2>
        <p className="text-light opacity-90 small mb-4 max-w-xl">
          Learn full-stack web development, Python data analytics, Java engineering, cloud architecture, and cybersecurity with hands-on projects.
        </p>
        <div style={{ maxWidth: '650px' }}>
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            placeholder="Search courses by keyword, topic, or instructor..."
          />
        </div>
      </div>

      {/* Filter Component */}
      <CourseFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
        sortBy={sortBy}
        onSelectSort={setSortBy}
        onResetFilters={handleResetFilters}
      />

      {/* Results Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="small text-muted">
          Showing <strong className="text-body">{filteredCourses.length}</strong> of {courses.length} courses
        </span>
        {searchTerm && (
          <span className="badge bg-light text-dark border">
            Search: "{searchTerm}"
          </span>
        )}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="card p-5 text-center border-0 shadow-sm">
          <i className="bi bi-search fs-1 text-muted mb-3"></i>
          <h4 className="fw-bold mb-1">No Courses Match Your Criteria</h4>
          <p className="text-muted small mb-3">
            Try adjusting your search keywords, category pills, or difficulty levels.
          </p>
          <button 
            className="btn btn-outline-primary btn-sm mx-auto px-3"
            onClick={handleResetFilters}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredCourses.map((course) => (
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
      )}
    </div>
  );
}

export default Courses;
