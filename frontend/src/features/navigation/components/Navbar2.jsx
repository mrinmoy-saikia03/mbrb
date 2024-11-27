import React, { useState } from "react";
import { Link } from "react-router-dom";
import Searchbox from "./searchbox";
import { ChevronDown, ShoppingBag, User } from "lucide-react";
import TopBanner from "./TopBanner";
import Logo from "./Logo";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const loggedIn = true;
  return (
    <>
      <header className="bg-ternary sticky top-0 z-50">
        <div className="mx-auto max-w-screen-xl px-1 sm:px-2 lg:px-3">
          <div className="flex py-1 items-center justify-between">
            <div className="">
              <div className="flex items-center justify-start gap-x-7 xl:gap-x-24">
                <Logo/>
                <div className="hidden  md:block">
                  <Searchbox />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="hidden md:block border-r-2 pr-5">
                <nav aria-label="Global">
                  <ul className="flex items-center gap-6 text-sm">
                    <li className="hover-underline-animation">
                      <a
                        className="text-white transition hover:text-white/75 xl:hover:text-white"
                        href="#"
                      >
                        {" "}
                        Home{" "}
                      </a>
                    </li>

                    <li className=" hover-underline-animation">
                      <a
                        className="text-white whitespace-nowrap transition hover:text-white/75 xl:hover:text-white"
                        href="#"
                      >
                        {" "}
                        Our Products
                      </a>
                    </li>

                    <li className="hover-underline-animation">
                      <a
                        className="text-white transition hover:text-white/75 xl:hover:text-white"
                        href="#"
                      >
                        {" "}
                        Branches{" "}
                      </a>
                    </li>

                    <li className="hover-underline-animation">
                      <a
                        className="text-white transition hover:text-white/75 xl:hover:text-white"
                        href="#"
                      >
                        {" "}
                        About{" "}
                      </a>
                    </li>

                    <li className="hover-underline-animation">
                      <a
                        className="text-white whitespace-nowrap transition hover:text-white/75 xl:hover:text-white"
                        href="#"
                      >
                        {" "}
                        Contact Us{" "}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative">
                  <ShoppingBag color="white" />
                  <p className="rounded-full h-[10px] w-[10px] bg-cta absolute top-0 right-0" />
                </button>
                {!loggedIn ? (
                  <div className="sm:flex sm:gap-4">
                    <button className="rounded-md bg-cta px-5 py-2.5 text-sm font-medium text-white shadow flex items-center gap-x-2">
                      <User className="hidden md:block" /> Login
                    </button>
                  </div>
                ) : (
                  <Link to={"/account"}>
                    <User className="text-white" size={27} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar2;
