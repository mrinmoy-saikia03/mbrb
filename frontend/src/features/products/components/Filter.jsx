import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProductsAsync } from "../ProductSlice";
import { Option, Select } from "@material-tailwind/react";

const sortOptions = [
  { name: "Price: low to high", sort: "price", order: "asc" },
  { name: "Price: high to low", sort: "price", order: "desc" },
];

const Filter = () => {
  const [sort, setSort] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const finalFilters = { sort };
    dispatch(fetchProductsAsync(finalFilters));
  }, [sort]);
  return (
    <div className="ml-5 mb-6 w-48">
      <Select
        onChange={(e) => {
          console.log("sort select", e);
          setSort(e);
        }}
        variant="standard"
        label="Sort by"
        className="text-black"
      >
        <Option value={null}>Reset</Option>

        {sortOptions.map((opt, index) => (
          <Option className="text-black" key={index} value={opt}>
            {opt.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Filter;
