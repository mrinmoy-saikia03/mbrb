const Category = require("../models/Category");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  try {
    const result = await Category.find({});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const newCategory = new Category({ name });
    const result = await newCategory.save();

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating category" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const result = await Category.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting category" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const result = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true } // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating category" });
  }
};
