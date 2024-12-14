const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    selectedWeightOption: {
      _id: {
        type: String,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Cart", cartSchema);
