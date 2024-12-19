import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  deleteAddressByIdAsync,
  selectAddressErrors,
  selectAddressStatus,
  updateAddressByIdAsync,
} from "../AddressSlice";
import {
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialHandler,
  Typography,
} from "@material-tailwind/react";
import { Cross, EllipsisVertical, PencilLine, Trash, X } from "lucide-react";
export const Address = ({
  _id,
  name,
  type,
  street,
  postalCode,
  country,
  phoneNumber,
  state,
  city,
}) => {
  const id = _id;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [edit, setEdit] = useState(false);
  const status = useSelector(selectAddressStatus);
  const error = useSelector(selectAddressErrors);

  const handleRemoveAddress = () => {
    setOpen(false);
    dispatch(deleteAddressByIdAsync(id));
  };

  const handleUpdateAddress = (data) => {
    const update = { ...data, _id: id };
    setEdit(false);
    dispatch(updateAddressByIdAsync(update));
  };
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full p-4 bg-white shadow rounded-md border">
      {/* Address Type */}
      <div className="flex gap-x-2 items-center">
        <p className="text-sm font-medium w-full p-2 rounded-md bg-secondary/60">
          {type?.toUpperCase()}
        </p>

        <SpeedDial open={open} handler={setOpen} placement="bottom">
          <SpeedDialHandler>
            <IconButton
              size="sm"
              className="rounded-full p-2"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <X
                  className="h-5 w-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                />
              ) : (
                <EllipsisVertical className="h-5 w-5" />
              )}
            </IconButton>
          </SpeedDialHandler>

          <SpeedDialContent>
            <SpeedDialAction
              onClick={() => {
                setOpen(false);
                setEdit(true);
              }}
              className="relative flex border-cta border h-14 w-14"
            >
              <PencilLine className="h-5 w-5 text-cta " />
              <Typography className="text-xs font-normal text-cta">
                Edit
              </Typography>
            </SpeedDialAction>
            <SpeedDialAction
              onClick={handleRemoveAddress}
              className="relative flex border-ternary border h-14 w-14"
            >
              <Trash className="h-5 w-5 text-ternary" />
              <Typography className="text-xs font-normal text-ternary">
                Delete
              </Typography>
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>

      {/* Address Details or Edit Form */}
      <form
        className="mt-4 "
        noValidate
        onSubmit={handleSubmit(handleUpdateAddress)}
      >
        {edit ? (
          <>
            <div>
              <label className="block text-sm font-medium">Type</label>
              <input
                type="text"
                {...register("type", { required: true, value: type })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Street</label>
              <input
                type="text"
                {...register("street", { required: true, value: street })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Postal Code</label>
              <input
                type="number"
                {...register("postalCode", {
                  required: true,
                  value: postalCode,
                })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Country</label>
              <input
                type="text"
                {...register("country", { required: true, value: country })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="number"
                {...register("phoneNumber", {
                  required: true,
                  value: phoneNumber,
                })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">State</label>
              <input
                type="text"
                {...register("state", { required: true, value: state })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                type="text"
                {...register("city", { required: true, value: city })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <p className="text-sm">Name - {name}</p>
            <p className="text-sm">Street - {street}</p>
            <p className="text-sm">Postal Code - {postalCode}</p>
            <p className="text-sm">Country - {country}</p>
            <p className="text-sm">Phone Number - {phoneNumber}</p>
            <p className="text-sm">State - {state}</p>
            <p className="text-sm">City - {city}</p>
          </div>
        )}

        {/* Action Buttons */}
        {edit && (
          <div className="flex justify-end space-x-4 mt-4">
            <>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-cta rounded "
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setEdit(false);
                  reset();
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-ternary rounded"
              >
                Cancel
              </button>
            </>
          </div>
        )}
      </form>
    </div>
  );
};
