const { Schema, default: mongoose } = require("mongoose");
const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    const { weightOptions, ...productData } = req.body;

    // Validate weightOptions
    if (
      !weightOptions ||
      !Array.isArray(weightOptions) ||
      weightOptions.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Please provide valid weight options." });
    }

    // Validate each weightOption object
    for (const option of weightOptions) {
      if (!option.weight || !option.price) {
        return res
          .status(400)
          .json({ message: "Each weight option must have weight and price." });
      }
    }

    const created = new Product({ ...productData, weightOptions });
    await created.save();

    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding product, please try again later." });
  }
};

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    const sort = {};
    let skip = 0;
    let limit = 0;

    // Filter by brand
    if (req.query.brand) {
      filter.brand = { $in: req.query.brand };
    }

    // Filter by category
    if (req.query.category) {
      filter.category = { $in: req.query.category };
    }

    // Exclude deleted products
    if (req.query.user) {
      filter.isDeleted = false;
    }

    // Sorting logic
    if (req.query.sort === "price") {
      const order = req.query.order === "asc" ? 1 : -1;
      sort["weightOptions.0.price"] = order; // Sort by the first price in weightOptions
    } else if (req.query.sort) {
      sort[req.query.sort] = req.query.order === "asc" ? 1 : -1;
    }

    // Pagination logic
    if (req.query.page && req.query.limit) {
      const pageSize = parseInt(req.query.limit, 10);
      const page = parseInt(req.query.page, 10);

      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const totalDocs = await Product.find(filter).countDocuments().exec();
    const results = await Product.find(filter)
      .sort(sort)
      .populate("brand")
      .populate("category")
      .skip(skip)
      .limit(limit)
      .exec();

    // Set total count in headers
    res.set("X-Total-Count", totalDocs);

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching products, please try again later." });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findById(id)
      .populate("brand")
      .populate("category");
    if (!result) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error getting product details, please try again later.",
    });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { weightOptions, ...updateData } = req.body;

    if (weightOptions) {
      // Validate weightOptions if provided
      if (!Array.isArray(weightOptions) || weightOptions.length === 0) {
        return res
          .status(400)
          .json({ message: "Please provide valid weight options." });
      }

      for (const option of weightOptions) {
        if (!option.weight || !option.price) {
          return res.status(400).json({
            message: "Each weight option must have weight and price.",
          });
        }
      }

      updateData.weightOptions = weightOptions;
    }

    const updated = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating product, please try again later." });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    ).populate("brand");
    if (!deleted) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting product, please try again later." });
  }
};

exports.undeleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const unDeleted = await Product.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true }
    ).populate("brand");
    if (!unDeleted) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(unDeleted);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error restoring product, please try again later." });
  }
};

exports.removeById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error removing product, please try again later." });
  }
};
