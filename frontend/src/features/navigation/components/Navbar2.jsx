import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Searchbox from "./SearchModal";
import { ChevronDown, Menu, Search, ShoppingBag, User } from "lucide-react";
import TopBanner from "./TopBanner";
import Logo from "./Logo";
import { CartDrawer } from "./CartDrawer";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../Modals/modalSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";

const Navbar2 = () => {
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
          <div className="flex md:py-1 items-center justify-between">
            <div className="">
              <div className="flex w-40 md:w-full items-center justify-start gap-x-7 xl:gap-x-24">
                <Logo />
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="hidden md:block border-r-2 pr-5">
                <nav aria-label="Global">
                  <ul className="flex items-center gap-6 text-sm">
                    <li className={`hover-underline-animation`}>
                      <Link
                        to={"/"}
                        className="text-white transition hover:text-white/75 xl:hover:text-white"
                        href="#"
                      >
                        {" "}
                        Home{" "}
                      </Link>
                    </li>

                    <li className={`hover-underline-animation `}>
                      <Link
                        to={"/sweets"}
                        className="text-white whitespace-nowrap transition hover:text-white/75 xl:hover:text-white"
                        href="#"
                      >
                        {" "}
                        Our Products
                      </Link>
                    </li>
                    {loggedInUser && !loggedInUser.isAdmin && (
                      <li className={`hover-underline-animation`}>
                        <Link
                          to={"/branches"}
                          className="text-white transition hover:text-white/75 xl:hover:text-white"
                          href="#"
                        >
                          {" "}
                          Branches{" "}
                        </Link>
                      </li>
                    )}
                    {loggedInUser && !loggedInUser.isAdmin && (
                      <li className={`hover-underline-animation`}>
                        <Link
                          to={"/about"}
                          className="text-white transition hover:text-white/75 xl:hover:text-white"
                          href="#"
                        >
                          {" "}
                          About{" "}
                        </Link>
                      </li>
                    )}
                    <li className={`hover-underline-animation `}>
                      {loggedInUser && !loggedInUser.isAdmin && (
                        <Link
                          to={"/contact"}
                          className="text-white whitespace-nowrap transition hover:text-white/75 xl:hover:text-white"
                          href="#"
                        >
                          {" "}
                          Contact Us{" "}
                        </Link>
                      )}
                    </li>

                    {loggedInUser && !loggedInUser.isAdmin && (
                      <li className={`hover-underline-animation `}>
                        <Link
                          to={"/contact"}
                          className="text-white whitespace-nowrap transition hover:text-white/75 xl:hover:text-white"
                          href="#"
                        >
                          {" "}
                          Contact Us{" "}
                        </Link>
                      </li>
                    )}

                    {loggedInUser && loggedInUser.isAdmin && (
                      <li className={`hover-underline-animation `}>
                        <Link
                          to={"/admin/dashboard"}
                          className="text-white whitespace-nowrap transition hover:text-white/75 xl:hover:text-white"
                          href="#"
                        >
                          {" "}
                          Dashboard{" "}
                        </Link>
                      </li>
                    )}

                    {loggedInUser && loggedInUser.isAdmin && (
                      <li className={`hover-underline-animation `}>
                        <Link
                          to={"/admin/add-product"}
                          className="text-white whitespace-nowrap transition hover:text-white/75 xl:hover:text-white"
                          href="#"
                        >
                          {" "}
                          New Product{" "}
                        </Link>
                      </li>
                    )}

                    {loggedInUser && loggedInUser.isAdmin && (
                      <li className={`hover-underline-animation `}>
                        <Link
                          to={"/admin/orders"}
                          className="text-white whitespace-nowrap transition hover:text-white/75 xl:hover:text-white"
                          href="#"
                        >
                          {" "}
                          Orders{" "}
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>

              <div className="flex items-center gap-4">
                {loggedInUser && (
                  <Link to={"/cart"} className="relative">
                    <ShoppingBag size={20} color="white" />
                    <p className="rounded-full h-[10px] w-[10px] bg-cta absolute top-0 right-0" />
                  </Link>
                )}
                <button onClick={openSearchModal} className="relative">
                  <Search size={20} color="white" />
                </button>
                {!loggedInUser ? (
                  <div className="sm:flex sm:gap-4">
                    <button
                      onClick={openLoginModal}
                      className="rounded-md bg-cta px-2 md:px-4 py-2 text-sm font-medium text-white shadow flex items-center gap-x-1"
                    >
                      <User size={20} /> Login
                    </button>
                  </div>
                ) : (
                  <Link to={"/account"}>
                    <User size={20} className="text-white" />
                  </Link>
                )}
                <button onClick={openMobileNav} className="lg:hidden">
                  <Menu size={20} color="white" />
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
