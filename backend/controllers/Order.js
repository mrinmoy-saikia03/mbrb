const Order = require("../models/Order");

exports.create = async (req, res) => {
  try {
    const created = new Order(req.body);
    await created.save();
    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating an order, please trying again later" });
  }
};

exports.getByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Order.find({ user: id });
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching orders, please trying again later" });
  }
};
exports.getAll = async (req, res) => {
  try {
    let skip = 0;
    let limit = 0;

    if (req.query.page && req.query.limit) {
      const pageSize = parseInt(req.query.limit, 10);
      const page = parseInt(req.query.page, 10);
      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const totalDocs = await Order.countDocuments().exec();
    const results = await Order.find({})
      .skip(skip)
      .limit(limit)
      .populate("user", "name email") // Fetches user info with only 'name' and 'email' fields
      .exec();

    res.header("X-Total-Count", totalDocs);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching orders, please try again later" });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Order.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error updating order, please try again later" });
  }
};
