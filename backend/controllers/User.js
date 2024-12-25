const User = require("../models/User");
const { sendMail } = require("../utils/Emails");

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = (await User.findById(id)).toObject();
    delete result.password;
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error getting your details, please try again later" });
  }
};
exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = (
      await User.findByIdAndUpdate(id, req.body, { new: true })
    ).toObject();
    delete updated.password;
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error getting your details, please try again later" });
  }
};

exports.contactUs = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    // Validate the request body
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields (name, email, subject, and message) are required",
      });
    }

    // Compose the email content
    const emailContent = `
        <p>You have received a new message from your website's contact form:</p>
        <p>------------------------------------------------------------------------</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>------------------------------------------------------------------------</p>
        <p>${message}</p>
      `;

    // Send the email
    await sendMail(
      process.env.ADMIN_EMAIL,
      `Contact Form Submission: ${subject}`,
      emailContent
    );

    // Respond with success
    res
      .status(200)
      .json({ message: "Your message has been sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      message: "Error submitting your message, please try again later",
    });
  }
};
