import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
  ArrowLeft,
  Menu,
  MoveLeft,
  ShoppingBag,
  House,
  X,
  Dessert,
  Building2,
  User,
  Store,
  SearchCheck,
  Headset,
  Power,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../Modals/modalSlice";

export function MobileNavigation() {
  const { isOpen, type, props } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const closeDrawer = () => dispatch(closeModal());

  return (
    <React.Fragment>
      <Drawer
        placement="left"
        open={isOpen && type === "mobileNav"}
        onClose={closeDrawer}
        className="p-4 bg-primary"
      >
        <div class="relative flex h-[calc(100vh-20rem)] w-full max-w-[20rem] flex-col rounded-xl bg-clip-border p-4 text-black">
          <div class="absolute right-0 top-0">
            <button
              onClick={closeDrawer}
              class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-black"
            >
              <X size={40} />
            </button>
          </div>
          <nav class="mt-10 flex min-w-[240px] flex-col gap-1 p-2 font-sans text-xl font-medium text-black">
            <div
              role="button"
              class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
            >
              <div class="grid mr-4 place-items-center">
                <Store />
              </div>
              Home
            </div>
            <div
              role="button"
              class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
            >
              <div class="grid mr-4 place-items-center">
                <Dessert />
              </div>
              Our Products
            </div>
            <div
              role="button"
              class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
            >
              <div class="grid mr-4 place-items-center">
                <Building2 />
              </div>
              Branches
            </div>
            <div
              role="button"
              class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
            >
              <div class="grid mr-4 place-items-center">
                <SearchCheck />
              </div>
              Aboust Us
            </div>

            <div
              role="button"
              class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
            >
              <div class="grid mr-4 place-items-center">
                <Headset />
              </div>
              Contact Us
            </div>
            <div
              role="button"
              class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
            >
              <div class="grid mr-4 place-items-center">
                <User />
              </div>
              Account
            </div>

            <div
              role="button"
              class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
            >
              <div class="grid mr-4 place-items-center">
                <Power />
              </div>
              Log Out
            </div>
          </nav>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
