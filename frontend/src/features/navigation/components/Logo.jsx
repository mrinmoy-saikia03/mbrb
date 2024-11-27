import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link href="/" className="w-48 md:w-56 lg:w-1/2 xl:w-1/3" to="/">
      <img
        src="https://i0.wp.com/mbrb.in/wp-content/uploads/2024/06/Logo-Whhite-4.png?w=600&ssl=1"
        className="w-full h-auto"
      />
    </Link>
  );
};

export default Logo;
