const express = require('express');
const router = express.Router();
// CORRECTED: The path now correctly points to the singular 'Message.js' file
const Message = require('../models/Message');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/messages
// @desc    Save a new contact message
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();
        res.status(201).json({ msg: 'Message sent successfully!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/messages
// @desc    Get all messages
// @access  Private (Requires a valid token)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/messages/:id
// @desc    Delete a message by its ID
// @access  Private (Requires a valid token)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        let message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ msg: 'Message not found' });
        }

        await Message.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Message removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

