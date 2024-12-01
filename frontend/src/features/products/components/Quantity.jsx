import React from "react";

const Quantity = () => {
  return (
    <div className="flex gap-x-5 items-center text-black">
      <div>Quantity</div>
      <div className="flex items-center">
        <button className="border border-secondary rounded-l px-3 py-1 hover:bg-secondary hover:text-white">
          -
        </button>
        <p className="border-y border-secondary px-3 py-1">2</p>
        <button className="border border-secondary rounded-r px-3 py-1 hover:bg-secondary hover:text-white">
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
