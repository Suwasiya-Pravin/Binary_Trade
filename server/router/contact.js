const express = require("express");
const router = express.Router();
const ContactUs = require("../models/contactSchema");
const { createContactController ,getAllContactController} = require('../controllers/ContactController')
// POST route to create a new contact entry
router.post("/create",createContactController);

// GET route to retrieve all contact entries
router.get("/getall",getAllContactController);

module.exports = router;
