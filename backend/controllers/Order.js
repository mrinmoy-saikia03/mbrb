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

//
const ORDER_STATUSES = ["Pending", "Delivered", "Cancelled", "Dispatched"];
const ITEMS_PER_PAGE = 5;
const calculatePagination = (page, totalItems) => {
  const currentPage = parseInt(page) || 1;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  return {
    currentPage,
    totalPages,
    skip,
    limit: ITEMS_PER_PAGE,
  };
};

//
exports.getAll = async (req, res) => {
  try {
    const { page } = req.query;

    // Get total counts for each status
    const statusCounts = await Promise.all(
      ORDER_STATUSES.map((status) => Order.countDocuments({ status }))
    );

    const totalOrders = statusCounts.reduce((sum, count) => sum + count, 0);
    const { currentPage, totalPages, skip, limit } = calculatePagination(
      page,
      totalOrders
    );

    // Fetch paginated orders for each status
    let allOrders = [];
    for (let status of ORDER_STATUSES) {
      const orders = await Order.find({ status })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate("user", "name email")
        .exec();

      allOrders = [...allOrders, ...orders];
    }

    res.status(200).json({
      orders: allOrders,
      pagination: {
        currentPage,
        totalPages,
        totalOrders,
        itemsPerPage: ITEMS_PER_PAGE,
        statusCounts: ORDER_STATUSES.reduce(
          (acc, status, index) => ({
            ...acc,
            [status]: statusCounts[index],
          }),
          {}
        ),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching orders, please try again later.",
    });
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

exports.getBySearchText = async (req, res) => {
  try {
    const { text } = req.params;

    if (!text) {
      return res.status(400).json({
        message: "Search text is required.",
      });
    }

    let query = {};

    if (/^[0-9a-fA-F]{24}$/.test(text)) {
      query = { _id: text };
    } else if (text.includes("@")) {
      // Partial or exact match for email
      query = { "user.email": { $regex: text, $options: "i" } };
    } else if (/^\d+$/.test(text)) {
      // Partial match for phone number in the address array
      query = { "address.phoneNumber": { $regex: text } };
    } else {
      return res.status(400).json({
        message: "Invalid input. Provide a valid ID, email, or phone number.",
      });
    }

    // Fetch the order(s)
    const result = await Order.find(query)
      .populate("user", "name email") // Fetch user details (name and email)
      .exec();

    if (!result || result.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found with the given input." });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching order, please try again later." });
  }
};
