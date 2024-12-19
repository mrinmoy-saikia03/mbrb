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

export const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const status = useSelector(selectAddressStatus);
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
      toast.success("Address added");
    } else if (addressAddStatus === "rejected") {
      toast.error("Error adding address, please try again later");
    }
  }, [addressAddStatus]);

  useEffect(() => {
    if (addressUpdateStatus === "fulfilled") {
      toast.success("Address updated");
    } else if (addressUpdateStatus === "rejected") {
      toast.error("Error updating address, please try again later");
    }
  }, [addressUpdateStatus]);

  useEffect(() => {
    if (addressDeleteStatus === "fulfilled") {
      toast.success("Address deleted");
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

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl p-4 mt-5 bg-white shadow-lg rounded-lg">
        {/* User Details */}
        <div className="flex flex-col items-center p-4 bg-cta/20 border-cta border text-black rounded-lg">
          <div className="w-16 h-16 rounded-full bg-cta text-white uppercase grid place-items-center text-3xl font-semibold">
            <p>{userInfo?.name[0]}</p>
          </div>
          <p className="mt-2 text-lg font-semibold">{userInfo?.name}</p>
          <p className="text-sm">{userInfo?.email}</p>
        </div>

        {/* Manage Addresses Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">Manage Addresses</h2>
            <button
              onClick={() => setAddAddress(true)}
              className="px-4 py-2 text-sm font-medium border border-cta text-cta rounded hover:bg-cta/20"
            >
              Add Address
            </button>
          </div>

          {/* Add Address Form */}
          {addAddress && (
            <form
              onSubmit={handleSubmit(handleAddAddress)}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium">Type</label>
                <input
                  type="text"
                  placeholder="e.g., Home, Business"
                  {...register("type", { required: true })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Full name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Street</label>
                <input
                  type="text"
                  {...register("street", { required: true })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Postal Code</label>
                <input
                  type="text"
                  {...register("postalCode", { required: true })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Country</label>
                <input
                  type="text"
                  {...register("country", { required: true })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register("phoneNumber", { required: true })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">State</label>
                <input
                  type="text"
                  {...register("state", { required: true })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">City</label>
                <input
                  type="text"
                  {...register("city", { required: true })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white rounded"
                >
                  Add
                </Button>
                <Button
                  type="button"
                  onClick={() => setAddAddress(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* Address List */}
          <div className="mt-4 space-y-4">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <Address key={address._id} {...address} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                You have no added addresses.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
