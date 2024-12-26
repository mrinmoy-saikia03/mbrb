import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProductsAsync } from "../ProductSlice";
import { Option, Select } from "@material-tailwind/react";

const sortOptions = [
  { name: "Price: low to high", sort: "price", order: "asc" },
  { name: "Price: high to low", sort: "price", order: "desc" },
];

const Filter = ({ searchText }) => {
  const [sort, setSort] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const finalFilters = { sort, searchText };
    dispatch(fetchProductsAsync(finalFilters));
  }, [sort, searchText]);

  return (
    <div className="ml-5 mb-6 w-48">
      <Select
        onChange={(value) => {
          setSort(sortOptions[value]); // Parse the stringified object
        }}
        variant="outlined"
        label="Sort by"
        className="text-black"
      >
        <Option value={null}>Reset</Option>
        <Option value={0}>Price: low to high</Option>
        <Option value={1}>Price: high to low</Option>
      </Select>
    </div>
  );
};

export default Filter;
