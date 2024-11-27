import { Search, X } from "lucide-react";
import React, { useState } from "react";

const Searchbox = () => {
  const [text, setText] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    alert(text);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="border-b w-full lg:w-10/12 xl:w-full flex items-center gap-x-1 pb-1"
    >
      <div>
        <Search className="text-white" size={20} />
      </div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        className="bg-transparent focus:outline-none text-white placeholder:text-white placeholder:text-sm "
        placeholder="Search for products"
      />
      <button type="button" onClick={() => setText("")}>
        <X
          className={`text-white font-semibold ${
            text ? "visible" : "invisible"
          }`}
          size={18}
        />
      </button>
    </form>
  );
};

export default Searchbox;
