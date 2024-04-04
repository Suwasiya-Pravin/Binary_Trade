const ContactUs = require("../models/contactSchema");

const createContactController = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new ContactUs({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: "Contact entry created successfully!" });
  } catch (error) {
    console.error("Error creating contact entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllContactController = async (req, res) => {
  try {
    const contacts = await ContactUs.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contact entries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createContactController,
  getAllContactController
};
