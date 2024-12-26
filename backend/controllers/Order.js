const Order = require("../models/Order");
const User = require("../models/User");
const { sendMail } = require("../utils/Emails");
const { addDays, format } = require("date-fns");

exports.create = async (req, res) => {
  try {
    const created = new Order(req.body);
    await created.save();
    const existingUser = await User.findById(req.body.user);
    // Calculate the estimated delivery date (12 days ahead)
    const estimatedDeliveryDate = format(
      addDays(new Date(created.createdAt), 12),
      "MMMM do, yyyy"
    );

    // Product details for both Admin and User
    const productDetails = created.item
      .map(
        (item) => `
          <li>
            <strong>Product Name:</strong> ${item.product.title}<br>
            <strong>Product Link:</strong> <a href="${
              process.env.ORIGIN
            }/sweets/${item.product._id}" target="_blank">
            ${process.env.ORIGIN}/sweets/${item.product._id}</a><br>
            <strong>Quantity:</strong> ${item.quantity}<br>
            <strong>Weight:</strong> ${item.selectedWeightOption.weight}g<br>
            <strong>Price per unit:</strong> Rs ${
              item.selectedWeightOption.price
            } /- <br>
            <strong>Total Price:</strong> Rs ${(
              item.selectedWeightOption.price * item.quantity
            ).toFixed(2)} /-
          </li>
        `
      )
      .join("");

    // Email templates

    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">New Order Received</h2>
        <p style="color: #555;">A new order has been placed. Here are the details:</p>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Order ID:</strong> ${created._id}</li>
          <li><strong>Customer Name:</strong> ${existingUser.name}</li>
          <li><strong>Email:</strong> ${existingUser.email}</li>
          <li><strong>Order Total:</strong> Rs ${created.total} /-</li>
          <li><strong>Order Date:</strong> ${format(
            new Date(created.createdAt),
            "MMMM do, yyyy"
          )}</li>
        </ul>
        <h3 style="color: #333;">Product Details:</h3>
        <ul style="list-style: none; padding: 0;">
          ${productDetails}
        </ul>
        <p style="color: #555;">Please log in to the admin portal to process this order.</p>
        <p style="color: #888; font-size: 12px;">This is an automated email. Please do not reply.</p>
      </div>
    `;

    const userEmailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Thank You for Your Order!</h2>
        <p style="color: #555;">Hi ${existingUser.name},</p>
        <p style="color: #555;">We have received your order and it is being processed. Here are the details:</p>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Order ID:</strong> ${created._id}</li>
          <li><strong>Order Total:</strong> Rs ${created.total} /-</li>
          <li><strong>Estimated Delivery Date:</strong> ${estimatedDeliveryDate}</li>
        </ul>
        <h3 style="color: #333;">Product Details:</h3>
        <ul style="list-style: none; padding: 0;">
          ${productDetails}
        </ul>
        <p style="color: #555;">If you have any questions or concerns, feel free to contact us at ${process.env.CONTACT_EMAIL}.</p>
        <p style="color: #555;">Thank you for choosing our service!</p>
        <p style="color: #888; font-size: 12px;">This is an automated email. Please do not reply.</p>
      </div>
    `;

    // Send emails
    await sendMail(
      process.env.ADMIN_EMAIL,
      "New Order Received",
      adminEmailContent
    );

    await sendMail(
      existingUser.email,
      "Your Order Confirmation",
      userEmailContent
    );

    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating an order, please try again later" });
  }
};

exports.getByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Order.find({ user: id }).sort({ createdAt: -1 });
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
    const { status, ...otherUpdates } = req.body;

    // Fetch the original order
    const originalOrder = await Order.findById(id);

    if (!originalOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if only the status is being updated
    if (status) {
      if (originalOrder.status === status) {
        return res.status(400).json({
          message: "The order status is already set to the specified value.",
        });
      }

      // Update the status
      originalOrder.status = status;
      await originalOrder.save();

      // Email content based on the new status
      const statusMessages = {
        Pending: "Your order is pending and will be processed soon.",
        Dispatched: "Your order has been dispatched and is on its way!",
        Delivered:
          "Your order has been successfully delivered. Thank you for shopping with us!",
        Cancelled:
          "We regret to inform you that your order has been cancelled. If you have any questions, please contact us.",
      };

      const emailContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Order Status Update</h2>
          <p style="color: #555;">Hi ${originalOrder.address[0].name},</p>
          <p style="color: #555;">We wanted to inform you that the status of your order has been updated:</p>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Order ID:</strong> ${originalOrder._id}</li>
            <li><strong>New Status:</strong> ${
              status.charAt(0).toUpperCase() + status.slice(1)
            }</li>
          </ul>
          <p style="color: #555;">${statusMessages[status]}</p>
          <p style="color: #555;">Thank you for choosing our service. If you have any questions, feel free to contact us at ${
            process.env.CONTACT_EMAIL
          }.</p>
          <p style="color: #888; font-size: 12px;">This is an automated email. Please do not reply.</p>
        </div>
      `;

      // Send email to the user
      const existingUser = await User.findById(req.body.user);
      await sendMail(
        existingUser.email,
        `Order Status Updated: ${
          status.charAt(0).toUpperCase() + status.slice(1)
        }`,
        emailContent
      );

      return res.status(200).json(originalOrder);
    }

    // If other fields are being updated, proceed normally
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedOrder);
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
