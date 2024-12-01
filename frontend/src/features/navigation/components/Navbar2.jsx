import React, { useState } from "react";
import { Link } from "react-router-dom";
import Searchbox from "./SearchModal";
import { ChevronDown, Menu, Search, ShoppingBag, User } from "lucide-react";
import TopBanner from "./TopBanner";
import Logo from "./Logo";
import { CartDrawer } from "./CartDrawer";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../Modals/modalSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const openCartDrawer = () => {
    window.scrollTo(0, 0);
    dispatch(openModal({ type: "cart" }));
  };

  const openMobileNav = () => {
    window.scrollTo(0, 0);
    dispatch(openModal({ type: "mobileNav" }));
  };

  const openSearchModal = () => {
    window.scrollTo(0, 0);
    dispatch(openModal({ type: "search" }));
  };

  const openLoginModal = () => {
    window.scrollTo(0, 0);
    dispatch(openModal({ type: "login" }));
  };
  return (
    <>
      <TopBanner />
      <header className="bg-ternary sticky top-0 z-50">
        <div className="mx-auto max-w-screen-xl px-1 sm:px-2 lg:px-3">
          <div className="flex py-1 items-center justify-between">
            <div className="">
              <div className="flex items-center justify-start gap-x-7 xl:gap-x-24">
                <Logo />
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="hidden md:block border-r-2 pr-5">
                <nav aria-label="Global">
                  <ul className="flex items-center gap-6 text-sm">
                    <li className="hover-underline-animation">
                      <Link
                        to={"/"}
                        className="text-white transition hover:text-white/75 xl:hover:text-white"
                        href="#"
                      >
                        {" "}
                        Home{" "}
                      </Link>
                    </li>

                    <li className=" hover-underline-animation">
                      <Link
                        to={"/sweets"}
                        className="text-white whitespace-nowrap transition hover:text-white/75 xl:hover:text-white"
                        href="#"
                      >
                        {" "}
                        Our Products
                      </Link>
                    </li>

                    <li className="hover-underline-animation">
                      <Link
                        to={"/branches"}
                        className="text-white transition hover:text-white/75 xl:hover:text-white"
                        href="#"
                      >
                        {" "}
                        Branches{" "}
                      </Link>
                    </li>

                    <li className="hover-underline-animation">
                      <Link
                        to={"/about"}
                        className="text-white transition hover:text-white/75 xl:hover:text-white"
                        href="#"
                      >
                        {" "}
                        About{" "}
                      </Link>
                    </li>

                    <li className="hover-underline-animation">
                      <Link
                        to={"/contact"}
                        className="text-white whitespace-nowrap transition hover:text-white/75 xl:hover:text-white"
                        href="#"
                      >
                        {" "}
                        Contact Us{" "}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="flex items-center gap-4">
                {loggedInUser && (
                  <button onClick={openCartDrawer} className="relative">
                    <ShoppingBag color="white" />
                    <p className="rounded-full h-[10px] w-[10px] bg-cta absolute top-0 right-0" />
                  </button>
                )}
                <button onClick={openSearchModal} className="relative">
                  <Search color="white" />
                </button>
                {!loggedInUser ? (
                  <div className="sm:flex sm:gap-4">
                    <button
                      onClick={openLoginModal}
                      className="rounded-md bg-cta px-2 md:px-4 py-2 text-sm font-medium text-white shadow flex items-center gap-x-1"
                    >
                      <User /> Login
                    </button>
                  </div>
                ) : (
                  <Link to={"/account"}>
                    <User className="text-white" size={27} />
                  </Link>
                )}
                <button onClick={openMobileNav} className="lg:hidden">
                  <Menu color="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar2;
