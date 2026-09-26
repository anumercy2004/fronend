import React from 'react';

function SearchBar({ searchTerm, onSearchChange, placeholder = "Search by course title, topic, or instructor..." }) {
  function handleChange(e) {
    const value = e.target.value;
    onSearchChange(value);
    console.log("Searching courses:", value);
  }

  function handleClear() {
    onSearchChange('');
    console.log("Search cleared");
  }

  return (
    <div className="position-relative w-100">
      <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
      <input
        type="text"
        className="form-control ps-5 pe-5 py-2.5 rounded-3 shadow-sm"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search courses"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 text-muted p-0"
          type="button"
          aria-label="Clear search"
        >
          <i className="bi bi-x-circle-fill"></i>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
