import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  selectAddresses,
  selectAddressAddStatus,
  selectAddressUpdateStatus,
  selectAddressDeleteStatus,
  selectAddressStatus,
  addAddressAsync,
  resetAddressAddStatus,
  resetAddressUpdateStatus,
  resetAddressDeleteStatus,
} from "../../address/AddressSlice";
import { Address } from "../../address/components/Address";
import { toast } from "react-toastify";
import { selectUserInfo } from "../UserSlice";
import { Button } from "@material-tailwind/react";
import { LogOut, Package, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";
import { logoutAsync } from "../../auth/AuthSlice";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const userInfo = useSelector(selectUserInfo);
  const addresses = useSelector(selectAddresses);
  const addressAddStatus = useSelector(selectAddressAddStatus);
  const addressUpdateStatus = useSelector(selectAddressUpdateStatus);
  const addressDeleteStatus = useSelector(selectAddressDeleteStatus);

  const [addAddress, setAddAddress] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (addressAddStatus === "fulfilled") {
      toast.success("Address added successfully");
    } else if (addressAddStatus === "rejected") {
      toast.error("Error adding address, please try again later");
    }
  }, [addressAddStatus]);

  useEffect(() => {
    if (addressUpdateStatus === "fulfilled") {
      toast.success("Address updated successfully");
    } else if (addressUpdateStatus === "rejected") {
      toast.error("Error updating address, please try again later");
    }
  }, [addressUpdateStatus]);

  useEffect(() => {
    if (addressDeleteStatus === "fulfilled") {
      toast.success("Address deleted successfully");
    } else if (addressDeleteStatus === "rejected") {
      toast.error("Error deleting address, please try again later");
    }
  }, [addressDeleteStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetAddressAddStatus());
      dispatch(resetAddressUpdateStatus());
      dispatch(resetAddressDeleteStatus());
    };
  }, [dispatch]);

  const handleAddAddress = (data) => {
    const address = { ...data, user: userInfo._id };
    dispatch(addAddressAsync(address));
    setAddAddress(false);
    reset();
  };

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Account
          </h1>
          <div className="hidden lg:flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <Link
              to="/orders"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Package className="w-5 h-5" />
              <span>My Orders</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-ternary text-white rounded-lg hover:bg-red-600 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center">
              <User className="w-12 h-12" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {userInfo?.name}
              </h2>
              <p className="text-gray-500 mt-1">{userInfo?.email}</p>
            </div>
          </div>
        </div>
        <div className="flex lg:hidden flex-col sm:flex-row w-full sm:w-auto gap-3">
          <Link
            to="/orders"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Package className="w-5 h-5" />
            <span>My Orders</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Addresses Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Manage Addresses
            </h2>
            <button
              onClick={() => setAddAddress(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Add Address</span>
            </button>
          </div>

          {/* Add Address Form */}
          {addAddress && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <form
                onSubmit={handleSubmit(handleAddAddress)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {[
                  {
                    name: "type",
                    label: "Type",
                    placeholder: "e.g., Home, Office",
                  },
                  { name: "name", label: "Full Name" },
                  { name: "street", label: "Street" },
                  { name: "postalCode", label: "Postal Code" },
                  { name: "country", label: "Country" },
                  { name: "phoneNumber", label: "Phone Number" },
                  { name: "state", label: "State" },
                  { name: "city", label: "City" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      {...register(field.name, { required: true })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                ))}
                <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 mt-4">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6"
                  >
                    Add Address
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setAddAddress(false)}
                    className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-6"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Address List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <Address key={address._id} {...address} />
              ))
            ) : (
              <div className="lg:col-span-2 text-center py-8">
                <p className="text-gray-500">
                  You haven't added any addresses yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
