import React from "react";

const Filter = ({ setFilters }) => {
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, category: value }));
  };

  const handleBrandChange = (event) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, brand: value }));
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, sort: value }));
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Filters</h3>

    </div>
  );
};

export default Filter;
