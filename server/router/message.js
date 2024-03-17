const express = require('express');
const Message = require('../models/Message');

const router = express.Router();

// Route: Send a new message
router.post('/send', async (req, res) => {
  try {
    const { content, receiverId } = req.body;

    // Create a new message
    const message = new Message({ content, sender: req.user._id, receiver: receiverId });
    await message.save();

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route: Get all messages for the authenticated user
router.get('/all', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate('sender', 'username email')
      .populate('receiver', 'username email');

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route: Get message details by ID
router.get('/:messageId', async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId)
      .populate('sender', 'username email')
      .populate('receiver', 'username email');

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route: Delete message by ID
router.delete('/:messageId', async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.messageId);

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
