import React from 'react';

function CourseFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedLevel,
  onSelectLevel,
  sortBy,
  onSelectSort,
  onResetFilters
}) {
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  function handleCategoryClick(cat) {
    onSelectCategory(cat);
    console.log("Selected category:", cat);
  }

  function handleLevelChange(e) {
    const val = e.target.value;
    onSelectLevel(val);
    console.log("Selected level filter:", val);
  }

  function handleSortChange(e) {
    const val = e.target.value;
    onSelectSort(val);
    console.log("Selected sort option:", val);
  }

  return (
    <div className="card p-3.5 mb-4 border-0 shadow-sm">
      <div className="row g-3 align-items-center">
        {/* Category Pills Strip */}
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="small fw-bold text-muted text-uppercase" style={{ letterSpacing: '0.05em' }}>
              Categories
            </span>
            <button 
              className="btn btn-link btn-sm text-decoration-none p-0 text-primary small"
              onClick={onResetFilters}
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
            </button>
          </div>
          <div className="d-flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className={`btn btn-sm rounded-pill px-3 py-1 ${
                  selectedCategory === cat
                    ? 'btn-primary'
                    : 'btn-outline-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdowns Row: Level & Sort */}
        <div className="col-md-6 col-lg-4">
          <label className="form-label small fw-semibold text-muted mb-1">
            Proficiency Level
          </label>
          <select 
            className="form-select form-select-sm rounded-3"
            value={selectedLevel}
            onChange={handleLevelChange}
          >
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        <div className="col-md-6 col-lg-4">
          <label className="form-label small fw-semibold text-muted mb-1">
            Sort Courses By
          </label>
          <select 
            className="form-select form-select-sm rounded-3"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="featured">Featured First</option>
            <option value="rating">Highest Rated</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default CourseFilter;
