const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    shelfLife: {
      type: String,
      required: true,
    },
    piecesPerKg: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    weightOptions: [
      {
        weight: {
          type: String, // e.g., '250g', '500g'
          required: true,
        },
        price: {
          type: Number, // Price corresponding to this weight
          required: true,
        },
      },
    ],
    discountPercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Product", productSchema);
