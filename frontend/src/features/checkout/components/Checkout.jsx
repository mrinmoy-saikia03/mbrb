import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Typography,
  Radio,
  IconButton,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddressAsync,
  selectAddressStatus,
  selectAddresses,
} from "../../address/AddressSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectOrderStatus,
} from "../../order/OrderSlice";
import { resetCartByUserIdAsync, selectCartItems } from "../../cart/CartSlice";

import { SHIPPING, TAXES } from "../../../constants";
import { motion } from "framer-motion";
import { Cart } from "../../cart/components/Cart";
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  selectSelectedProduct,
} from "../../products/ProductSlice";

export const Checkout = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSingleCheckout = searchParams.get("single") === "true";
  const productId = searchParams.get("product");
  const queryQuantity = parseInt(searchParams.get("quantity"), 10);
  const queryWeightOption = searchParams.get("weightOption");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addresses = useSelector(selectAddresses);
  const loggedInUser = useSelector(selectLoggedInUser);
  const product = useSelector(selectSelectedProduct);
  const cartItems = useSelector(selectCartItems);
  const addressStatus = useSelector(selectAddressStatus);
  const orderStatus = useSelector(selectOrderStatus);
  const currentOrder = useSelector(selectCurrentOrder);

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");
  const [singleProductItem, setSingleProductItem] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const orderTotal = isSingleCheckout
    ? singleProductItem?.total || 0
    : cartItems.reduce(
        (acc, item) => item.selectedWeightOption.price * item.quantity + acc,
        0
      );

  useEffect(() => {
    if (isSingleCheckout && productId) {
      dispatch(fetchProductByIdAsync(productId));
    }
  }, [dispatch, isSingleCheckout, productId]);

  useEffect(() => {
    if (product && isSingleCheckout) {
      const weightOption = product.weightOptions.find(
        (option) => option._id === queryWeightOption
      );
      if (weightOption) {
        setSingleProductItem({
          product,
          selectedWeightOption: weightOption,
          quantity: queryQuantity,
          user: loggedInUser._id,
        });
      }
    }
  }, [product, isSingleCheckout, queryQuantity, queryWeightOption]);

  useEffect(() => {
    if (currentOrder && currentOrder?._id) {
      dispatch(resetCartByUserIdAsync(loggedInUser?._id));
      navigate(`/order-success/${currentOrder?._id}`);
    }
  }, [currentOrder, dispatch, loggedInUser, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch]);

  const handleAddAddress = (data) => {
    const address = { ...data, user: loggedInUser._id };
    dispatch(addAddressAsync(address));
  };

  const handleCreateOrder = () => {
    const order = {
      user: loggedInUser._id,
      item: isSingleCheckout ? [singleProductItem] : cartItems,
      address: selectedAddress,
      paymentMode: selectedPaymentMethod,
      total: orderTotal + SHIPPING + TAXES,
    };
    dispatch(createOrderAsync(order));
  };

  return (
    <div className="flex flex-wrap justify-center p-6 gap-10 mb-20 mt-6 overflow-hidden">
      {/* Left Section */}
      <div className="flex flex-col gap-6">
        {/* Heading */}
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ x: -5 }}>
            <IconButton>
              <Link to="/cart">
                <i className="material-icons">arrow_back</i>
              </Link>
            </IconButton>
          </motion.div>
          <Typography variant="h4">Shipping Information</Typography>
        </div>

        {/* Address Form */}
        <form
          className="flex flex-col gap-4"
          noValidate
          onSubmit={handleSubmit(handleAddAddress)}
        >
          {/* Input fields for address */}
        </form>

        {/* Existing Addresses */}
        <div className="flex flex-col gap-4">
          <Typography variant="h6">Address</Typography>
          <Typography variant="small" color="gray">
            Choose from existing addresses
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addresses.map((address) => (
              <Card key={address._id} className="p-4 border border-gray-200">
                <div className="flex items-center gap-4">
                  <Radio
                    name="addressRadioGroup"
                    value={selectedAddress}
                    checked={selectedAddress === address}
                    onChange={() => setSelectedAddress(address)}
                  />
                  <Typography>{address.type}</Typography>
                </div>
                <div>
                  <Typography>{address.street}</Typography>
                  <Typography>
                    {address.state}, {address.city}, {address.country},{" "}
                    {address.postalCode}
                  </Typography>
                  <Typography>{address.phoneNumber}</Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-col gap-4">
          <Typography variant="h6">Payment Methods</Typography>
          <Typography variant="small" color="gray">
            Please select a payment method
          </Typography>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <Radio
                name="paymentMethod"
                value="COD"
                checked={selectedPaymentMethod === "COD"}
                onChange={() => setSelectedPaymentMethod("COD")}
              />
              <Typography>Cash On Delivery (COD)</Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-4 w-full md:w-auto">
        <Typography variant="h4">Order Summary</Typography>
        {/* Show single product or cart */}
        {isSingleCheckout && singleProductItem ? (
          <div>
            <Typography>{singleProductItem.name}</Typography>
            <Typography>
              {singleProductItem.selectedWeightOption.label} - Quantity:{" "}
              {singleProductItem.quantity}
            </Typography>
            <Typography>Total: ${singleProductItem.total}</Typography>
          </div>
        ) : (
          <Cart checkout={true} />
        )}
        <Button
          fullWidth
          onClick={handleCreateOrder}
          disabled={orderStatus === "pending"}
        >
          Pay and Order
        </Button>
      </div>
    </div>
  );
};
