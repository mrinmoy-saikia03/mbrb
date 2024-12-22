import React, { useEffect, useState } from "react";
import { Button, Rating } from "@material-tailwind/react";
import Quantity from "./Quantity";
import ProductImageSwiper from "./ProductImageSwiper";
import { Truck, Clock, IndianRupee } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  resetProductFetchStatus,
  selectProductFetchStatus,
  selectSelectedProduct,
} from "../ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import {
  addToCartAsync,
  deleteCartItemByIdAsync,
  resetCartItemAddStatus,
  selectCartItemAddStatus,
  selectCartItemRemoveStatus,
  selectCartItems,
  updateCartItemByIdAsync,
} from "../../cart/CartSlice";
import {
  fetchReviewsByProductIdAsync,
  resetReviewFetchStatus,
} from "../../review/ReviewSlice";
import {
  resetWishlistItemAddStatus,
  resetWishlistItemDeleteStatus,
} from "../../wishlist/WishlistSlice";
import { toast } from "react-toastify";
const ProductInfo = () => {
  const { id } = useParams();
  const product = useSelector(selectSelectedProduct);
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems);
  const cartItemAddStatus = useSelector(selectCartItemAddStatus);
  const cartItemRemoveStatus = useSelector(selectCartItemRemoveStatus);
  const [productQuantity, setQuantity] = useState(1);
  const [selectedWeightOption, setSelectedWeightOption] = useState({});
  const [cartItemId, setCartItemId] = useState(null);

  useEffect(() => {
    if (product && product.weightOptions?.length > 0) {
      setSelectedWeightOption(product.weightOptions[0]);
    }
  }, [product]);

  const isProductAlreadyInCart = !!cartItemId; // True if cartItemId is found

  const productFetchStatus = useSelector(selectProductFetchStatus);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
      dispatch(fetchReviewsByProductIdAsync(id));
    }
  }, [id]);

  useEffect(() => {
    if (cartItemAddStatus === "fulfilled") {
      toast("Product added to cart");
    } else if (cartItemAddStatus === "rejected") {
      toast.error("Error adding product to cart, please try again later");
    }
  }, [cartItemAddStatus]);

  useEffect(() => {
    if (product && cartItems.length > 0 && selectedWeightOption) {
      const cartItem = cartItems.find(
        (item) =>
          item.product._id === product._id &&
          item.selectedWeightOption._id === selectedWeightOption._id
      );

      if (cartItem) {
        setCartItemId(cartItem._id);
      } else {
        setCartItemId(null);
      }
    } else {
      setCartItemId(null);
    }
  }, [cartItems, product, selectedWeightOption]);

  useEffect(() => {
    if (cartItemRemoveStatus === "fulfilled") {
      toast("Product removed from cart");
      setCartItemId(null); // Reset the cart item ID
    } else if (cartItemRemoveStatus === "rejected") {
      toast.error("Error removing product from cart, please try again later");
    }
  }, [cartItemRemoveStatus]);

  useEffect(() => {
    if (productFetchStatus === "rejected") {
      toast.error("Error fetching product details, please try again later");
    }
  }, [productFetchStatus]);
  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
      dispatch(resetProductFetchStatus());
      dispatch(resetReviewFetchStatus());
      dispatch(resetWishlistItemDeleteStatus());
      dispatch(resetWishlistItemAddStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, []);

  const handleAddToCart = () => {
    const item = {
      user: loggedInUser._id,
      product: id,
      quantity: productQuantity,
      selectedWeightOption: selectedWeightOption,
    };
    dispatch(addToCartAsync(item));
    setQuantity(1);
  };

  const handleAddQty = () => {
    const update = { _id: cartItemId, quantity: productQuantity + 1 };
    dispatch(updateCartItemByIdAsync(update));
    setQuantity((prev) => prev + 1);
  };
  const handleRemoveQty = () => {
    if (productQuantity === 1) {
      dispatch(deleteCartItemByIdAsync(cartItemId));
    } else {
      const update = { _id: cartItemId, quantity: productQuantity - 1 };
      dispatch(updateCartItemByIdAsync(update));
      setQuantity((prev) => prev - 1);
    }
  };

  const handleProductRemove = () => {
    if (cartItemId) {
      dispatch(deleteCartItemByIdAsync(cartItemId));
    }
  };

  const handleWeightChange = (weightOptionId) => {
    const weightOption = product.weightOptions.find(
      (opt) => opt._id === weightOptionId
    );
    setSelectedWeightOption(weightOption);
  };

  const handleBuyNowClick = () => {
    navigate(
      `/checkout?single=true&product=${id}&quantity=${productQuantity}&weightOption=${selectedWeightOption._id}`
    );
  };

  return (
    <section class="text-gray-600 body-font overflow-hidden">
      {productFetchStatus === "fullfilled" && product && (
        <div class="px-5 py-24">
          <div class="xl:w-4/5 mx-auto lg:flex">
            <div>
              <ProductImageSwiper
                images={[product.thumbnail, ...product.images]}
              />
            </div>
            <div className="flex-1 lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                {product.category.name}
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <Rating value={4} readonly />
                  <span class="text-gray-600 ml-3">
                    {product.rating} Reviews
                  </span>
                </span>
              </div>

              {/* Product Pricing and weight section */}

              <div class="flex mt-5 p-3 pb-5">
                <p class="title-font font-medium text-2xl text-gray-900 flex items-center">
                  <IndianRupee /> {selectedWeightOption.price}
                </p>
                <select
                  onChange={(e) => handleWeightChange(e.target.value)}
                  class="ml-5 lg:ml-auto text-sm border-2 border-secondary w-3/4 bg-transparent rounded"
                >
                  {product.weightOptions.map((opt, ind) => {
                    return (
                      <option key={ind} value={opt._id}>
                        {opt.weight}gm - {opt.price}Rs
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className=" border-b pb-5 border-cta">
                <div className="flex gap-x-5 items-center text-black">
                  <div>Quantity</div>
                  <div className="flex items-center">
                    <button
                      onClick={handleRemoveQty}
                      className="border border-secondary rounded-l px-3 py-1 hover:bg-secondary hover:text-white"
                    >
                      -
                    </button>
                    <p className="border-y border-secondary px-3 py-1">
                      {productQuantity}
                    </p>
                    <button
                      onClick={handleAddQty}
                      className="border border-secondary rounded-r px-3 py-1 hover:bg-secondary hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 mt-5 w-full">
                <Button
                  onClick={handleBuyNowClick}
                  className="flex-1 w-full ml-auto text-center text-white bg-ternary border-0 py-4 tracking-widest px-6 rounded"
                >
                  Buy Now
                </Button>
                {isProductAlreadyInCart ? (
                  <Button
                    onClick={handleProductRemove}
                    className="flex-1 w-full ml-auto text-center text-white bg-secondary border-0 py-4 tracking-widest px-6  rounded"
                  >
                    Remove from Cart
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 w-full ml-auto text-center text-white bg-secondary border-0 py-4 tracking-widest px-6  rounded"
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
              <p class="leading-relaxed mt-5">{product.description}</p>
              <ul className="py-3">
                <li className="py-2">
                  <span className="font-semibold">Ingredients</span>:{" "}
                  {product.ingredients}
                </li>
                <li className="py-2">
                  <span className="font-semibold">Shelf Life</span>:
                  {product.shelfLife}
                </li>
                <li className="py-2">
                  <span className="font-semibold">Pieces(1kg)</span>:{" "}
                  {product.piecesPerKg}
                </li>
              </ul>
              <div className="flex gap-x-2 border-t border-cta text-ternary pt-3 items-center justify-center">
                <Clock /> Order Now to get it delivered by 7th December,2024
                (ETA) <Truck />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductInfo;
